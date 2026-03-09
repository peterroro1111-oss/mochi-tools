import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix for @imgly/background-removal ONNX runtime
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    // Ignore .node binary files
    config.module.rules.push({
      test: /\.node$/,
      use: 'ignore-loader',
    });
    return config;
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  silent: true,
  org: '',
  project: '',
  disableSourceMapUpload: true,
});
