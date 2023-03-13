/** @type {import('next').NextConfig} */
const withFonts = require('next-fonts');

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'is5-ssl.mzstatic.com',
        },
        {
            protocol: 'https',
            hostname: 'is4-ssl.mzstatic.com',
        },
        {
            protocol: 'https',
            hostname: 'is3-ssl.mzstatic.com',
        },
        {
            protocol: 'https',
            hostname: 'is2-ssl.mzstatic.com',
        },{
            protocol: 'https',
            hostname: 'is1-ssl.mzstatic.com',
        }],
    }
}

module.exports = withFonts({
    webpack(config, options) {
        return config;
    }
});

module.exports = nextConfig;
