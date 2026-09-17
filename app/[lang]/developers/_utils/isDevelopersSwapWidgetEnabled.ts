/**
 * Temporary kill switch for the live `/developers` swap-widget embed, which failed QA.
 * Unset or any value other than `true` hides the embed so the rest of the page can ship.
 * Flip `NEXT_PUBLIC_ENABLE_DEVELOPERS_SWAP_WIDGET=true` (and rebuild) once the follow-up fix lands.
 */
export const isDevelopersSwapWidgetEnabled = (): boolean =>
  process.env.NEXT_PUBLIC_ENABLE_DEVELOPERS_SWAP_WIDGET === 'true'
