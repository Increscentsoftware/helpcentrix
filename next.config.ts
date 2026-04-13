const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_QUESTION_API: "https://helpcentrix-backend-production.up.railway.app/api/questions",
  },
};

export default nextConfig;