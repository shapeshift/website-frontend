import {Suspense} from 'react';

import type {ReactNode} from 'react';

export default function Layout({children}: {children: ReactNode}): ReactNode {
	return <Suspense>{children}</Suspense>;
}
