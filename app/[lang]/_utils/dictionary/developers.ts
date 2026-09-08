export const DEVELOPERS_DICT = {
  expand: {
    titleLine1: 'Build with',
    titleLine2: 'ShapeShift.',
    description: 'Explore API documentation, integration guides, and reference material for crypto applications.',
    ctaButton: 'View API Docs',
  },
  page: {
    widget: {
      title: 'Your brand. Make it feel native.',
      description:
        'Choose a theme, set the default assets, and preview a swap experience that feels built into your product.',
      ctaButton: 'Open the widget sandbox',
    },
    api: {
      title: 'Skip the UI and build your own',
      description:
        'Use the same routing engine through a REST API. We return unsigned transactions for your users to sign and broadcast.',
      endpoints: [
        {
          method: 'GET /v1/assets',
          title: 'List chains and assets',
          description: 'Enumerate what your users can trade, by CAIP-19 ID.',
        },
        {
          method: 'GET /v1/swap/rates',
          title: 'Fetch rates for a pair',
          description: 'One call returns a rate from every available swapper. No transaction yet.',
        },
        {
          method: 'POST /v1/swap/quote',
          title: 'Get an executable quote',
          description: 'Returns transaction data. Your user signs it in their own wallet, funds never touch us.',
        },
      ],
    },
    economics: {
      title: 'How the revenue share works',
      description: 'One partner code follows every swap to on-chain settlement. No invoices or payout schedules.',
    },
    stats: {
      chains: { value: '48+', title: 'Supported chains' },
      assets: { value: '30,000+', title: 'Tradable assets' },
      volume: { value: '$1.7B+', title: 'Lifetime swap volume' },
    },
    faq: {
      title: 'Questions partners ask',
      items: [
        {
          question: 'Which chains are supported?',
          answer:
            'Bitcoin, Ethereum and the major L2s (Arbitrum, Base, Optimism), Solana, Avalanche, BNB Chain, Cosmos, and more. 48+ chains today, with new routes added as the underlying aggregators support them. The full, current list is served by the API: https://api.shapeshift.com/v1/chains',
          hasChainsLink: true,
        },
        {
          question: 'What does it cost to integrate?',
          answer:
            'Nothing. There is no license fee or API key charge. Your affiliate fee is added on top of the protocol fee and paid directly to you.',
          hasChainsLink: false,
        },
        {
          question: 'Who holds user funds?',
          answer:
            'Swaps are non-custodial end to end. Users sign transactions from their own wallets, and funds move directly through the underlying protocols.',
          hasChainsLink: false,
        },
        {
          question: 'What support do partners get?',
          hasChainsLink: false,
          answer:
            'Support does not stop at launch. Partners get a direct channel to our integration engineers for the lifetime of the integration, on both technical and marketing questions, plus example repos and a staging affiliate ID for testing.',
        },
      ],
    },
    cta: {
      title: 'Integrate multichain swaps in your product',
      description: 'Configure the Widget, preview your theme, create a partner code, and start earning on every swap.',
      ctaPrimary: 'Configure the Widget',
      ctaSecondary: 'Talk with us',
    },
  },
} as const
