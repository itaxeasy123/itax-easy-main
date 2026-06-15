// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true,

// //   eslint: {
// //     ignoreDuringBuilds: true,
// //   },

// //   webpack: (config, { dev }) => {
// //     if (dev) config.optimization.minimize = false;
// //     return config;
// //   },

// //   images: {
// //     domains: ['source.unsplash.com'],
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "*",
// //         port: "",
// //         pathname: "/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "api.itaxeasy.com",
// //         port: "",
// //         pathname: "/uploads/**",
// //       },
// //     ],
// //   },

// // async rewrites() {
// //   return [
// //     {
// //       source: "/api/:path*",
// //       destination: "http://localhost:8000/api/:path*",
// //     },
// //   ];
// // },

// // };

// // module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   webpack: (config, { dev }) => {
//     if (dev) config.optimization.minimize = false;
//     return config;
//   },

//   images: {
//     domains: [
//       'source.unsplash.com',
//       'localhost', // ✅ IMPORTANT FIX
//     ],

//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '8000', // ✅ LOCAL BACKEND IMAGES
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'api.itaxeasy.com',
//         pathname: '/uploads/**',
//       },
//     ],
//   },

//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://api.itaxeasy.com/api/:path*',
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, { dev }) => {
    if (dev) config.optimization.minimize = false;
    return config;
  },

  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com', // ADD THIS
      'localhost',
      'img.freepik.com',
      'res.cloudinary.com', // ✅ MOST IMPORTANT FIX
    ],

    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.itaxeasy.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // ✅ REQUIRED
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.itaxeasy.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;