/** @type {import('next').NextConfig} */
/** @type {import('next-pwa')} */
const withPWA  = ({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
}); 

const nextConfig = {
    
    
};



export default  {nextConfig};
