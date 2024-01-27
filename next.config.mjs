/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_KEY: process.env.REACT_APP_API_BASEURL,
      }
};

export default nextConfig;
