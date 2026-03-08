import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default withNextIntl(nextConfig);
