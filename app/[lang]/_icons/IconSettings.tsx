import type { ReactNode, SVGProps } from 'react'

export function IconSettings(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg {...props} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
      <circle cx={'12'} cy={'12'} r={'3'} stroke={'currentColor'} strokeWidth={'2'} />
      <path
        d={
          'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.09H2.91a2 2 0 0 1 0-4H3a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V2.91a2 2 0 0 1 4 0V3a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1h.09a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'
        }
        stroke={'currentColor'}
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  )
}
