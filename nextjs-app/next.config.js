/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:["www.gravatar.com","localhost"]
  }
}

module.exports = nextConfig
