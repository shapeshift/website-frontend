import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	/* config options here */
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'cross-origin-opener-policy',
						value: 'same-origin'
					},
					{
						key: 'cross-origin-embedder-policy',
						value: 'require-corp'
					}
				]
			}
		];
	}
};

export default withNextIntl(nextConfig);
