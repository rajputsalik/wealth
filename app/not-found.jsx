// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function NotFound() {
//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
//       {/* Centered content */}
//       <div className="z-10 flex flex-col items-center text-center px-4">
//         {/* Big 404 with gradient text */}
//         <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse mb-6">
//           404
//         </h1>

//         {/* Subtitle */}
//         <h2 className="text-3xl font-semibold text-gray-800 mb-4">
//           Page Not Found
//         </h2>

//         {/* Message */}
//         <p className="text-lg text-gray-600 max-w-md mb-8">
//           Oops! The page you’re looking for doesn’t exist or has been moved.
//         </p>

//         {/* Button */}
//         <div className="flex gap-4">
//           <Link href="/">
//             <Button className="rounded-xl px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
//               Return Home
//             </Button>
//           </Link>
//           <Link href="/dashboard">
//             <Button
//               variant="outline"
//               className="rounded-xl px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Go to Dashboard
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* Background blobs (decorative only) */}
//       <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
//       <div className="absolute top-40 right-10 w-60 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
//       <div className="absolute bottom-20 left-1/3 w-52 h-52 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
//     </div>
//   );
// }






"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen text-center overflow-hidden bg-animated px-4">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center"
      >
        {/* Big 404 */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 mb-6"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white drop-shadow mb-4">
          Oops! You’re in the wrong galaxy 🌌
        </h2>

        {/* Message */}
        <p className="text-lg text-gray-200 max-w-md mb-8">
          The page you’re looking for doesn’t exist or has drifted away.  
          Let’s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href="/">
            <Button className="rounded-xl px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              Return Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-xl px-6 py-3 text-lg text-white border-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
