/** @type {import('next').NextConfig} */

// This is needed to avoid errors when building the app for pino-pretty, lokijs and encoding
const nextConfig = {
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
};

export default nextConfig;