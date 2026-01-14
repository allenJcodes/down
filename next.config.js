/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Phaser requires these for proper bundling
        config.resolve.alias = {
            ...config.resolve.alias,
        };
        return config;
    },
};

module.exports = nextConfig;
