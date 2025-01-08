import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
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

export default nextConfig;