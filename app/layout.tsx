import type {ReactNode} from 'react';

import './globals.css';

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>): ReactNode {
	return (
		<html lang={'en'}>
			<body>{children}</body>
		</html>
	);
}
