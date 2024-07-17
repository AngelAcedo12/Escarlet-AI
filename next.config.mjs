/** @type {import('next').NextConfig} */



const nextConfig = {
      headers: async () => {
        return [
          {
              source: '/',
              headers: [
                  {
                      key: 'Cross-Origin-Embedder-Policy',
                      value: 'require-corp',
                  },
                  {
                      key: 'Cross-Origin-Opener-Policy',
                      value: 'same-origin',
                  },
              ],
          },
      ];
    },
    experimental: {
        nextScriptWorkers: true,
      },
};
export default  nextConfig;
