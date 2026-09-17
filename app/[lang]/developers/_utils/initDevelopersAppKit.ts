import {
  arbitrum,
  avalanche,
  base,
  bitcoin,
  bsc,
  gnosis,
  hyperEvm,
  katana,
  mainnet,
  megaeth,
  monad,
  optimism,
  plasma,
  polygon,
  solana,
} from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { getChainIcon } from '@shapeshiftoss/swap-widget'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'

import type { AppKitNetwork } from '@reown/appkit/networks'
import type { AppKitOptions, CaipNetworkId } from '@reown/appkit/react'
import type { ChainId } from '@shapeshiftoss/swap-widget'

// Mirrors the network list @shapeshiftoss/swap-widget would register if it initialised AppKit
// itself (packages/swap-widget/src/config/appkit.ts). The widget hooks into whichever AppKit
// singleton exists at mount, so the host has to offer the same chains for the same wallets to work.
const EVM_NETWORKS: readonly AppKitNetwork[] = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  avalanche,
  bsc,
  gnosis,
  monad,
  megaeth,
  hyperEvm,
  plasma,
  katana,
]

const ALL_NETWORKS: readonly AppKitNetwork[] = [...EVM_NETWORKS, bitcoin, solana]

// Chains with a ShapeShift-run RPC proxy, keyed by the api.<host>.shapeshift.com subdomain. Same
// endpoints the widget's own viem clients use for status polling, so wallet balances and Solana
// reads go through our infrastructure first and only fall back to Reown's Blockchain API.
const SHAPESHIFT_RPC_PROXIES: readonly (readonly [AppKitNetwork, string])[] = [
  [mainnet, 'ethereum'],
  [optimism, 'optimism'],
  [bsc, 'bnbsmartchain'],
  [gnosis, 'gnosis'],
  [polygon, 'polygon'],
  [base, 'base'],
  [arbitrum, 'arbitrum'],
  [avalanche, 'avalanche'],
  [solana, 'solana'],
]

// viem chain definitions (the EVM entries) carry no CAIP id; AppKit derives it the same way.
const toCaipNetworkId = (network: AppKitNetwork): CaipNetworkId =>
  'caipNetworkId' in network ? network.caipNetworkId : `eip155:${network.id}`

// AppKit only ships preset icons for well-known chains, so newer ones (MegaETH, HyperEVM, Plasma,
// Katana) render as a generic globe in its network picker. Reuse the icon set the widget itself
// draws in its chain sidebar so both surfaces match.
const chainImages: NonNullable<AppKitOptions['chainImages']> = Object.fromEntries(
  ALL_NETWORKS.flatMap((network) => {
    const icon = getChainIcon(toCaipNetworkId(network) as ChainId)
    return icon ? [[network.id, icon]] : []
  })
)

const customRpcUrls: NonNullable<AppKitOptions['customRpcUrls']> = Object.fromEntries(
  SHAPESHIFT_RPC_PROXIES.map(([network, host]) => [
    toCaipNetworkId(network),
    [{ url: `https://api.${host}.shapeshift.com/api/v1/jsonrpc` }],
  ])
)

let isInitialised = false

/**
 * Initialise the Reown AppKit singleton the swap widget will attach to. Must run before the widget
 * mounts (it reads the singleton once and doesn't wait for it). Safe to call more than once.
 * Without a project ID nothing is initialised and the widget renders empty, as it did when it
 * owned the initialisation itself.
 */
export function initDevelopersAppKit(projectId: string | undefined): void {
  if (isInitialised) return
  if (!projectId) {
    console.warn('[developers] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set; the swap widget will not render')
    return
  }
  isInitialised = true

  const wagmiAdapter = new WagmiAdapter({ networks: [...EVM_NETWORKS], projectId, customRpcUrls })
  const bitcoinAdapter = new BitcoinAdapter()
  const solanaAdapter = new SolanaAdapter({ wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()] })

  createAppKit({
    adapters: [wagmiAdapter, bitcoinAdapter, solanaAdapter],
    projectId,
    networks: [...ALL_NETWORKS] as [AppKitNetwork, ...AppKitNetwork[]],
    chainImages,
    customRpcUrls,
    features: { send: false },
  })
}
