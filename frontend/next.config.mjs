/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/users",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
