"use client";

import { motion } from "framer-motion";
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { RiShieldCheckLine } from "react-icons/ri";

export default function Footer() {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/iamvasim", label: "GitHub", color: "hover:text-gray-300" },
    { icon: FaTwitter, href: "https://x.com/_iamwasim2", label: "Twitter", color: "hover:text-cyan-400" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/mohdvasim09/", label: "LinkedIn", color: "hover:text-blue-400" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative w-full mt-20 pb-8"
    >
      {/* Gradient divider line with glow */}
      <div className="relative w-full h-[2px] mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent blur-sm" />
      </div>

      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          
          {/* Left side - Creator info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col items-center lg:items-start gap-3"
          >
            <div className="flex items-center gap-2.5 text-gray-300">
              <span className="text-sm font-medium">Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaHeart className="text-red-500 text-lg" />
              </motion.div>
              <span className="text-sm font-medium">by</span>
            </div>
            
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-white tracking-wide relative">
                <span className="relative z-10">MOHAMMAD VASIM</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-500 opacity-80 blur-sm"></span>
              </h3>
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <HiSparkles className="text-yellow-400 text-lg" />
              </motion.div>
            </motion.div>

            <p className="text-xs text-gray-500 italic">
              Full Stack Developer & Open Source Enthusiast
            </p>
          </motion.div>

          {/* Center - Peero branding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2">
              <RiShieldCheckLine className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Powered by WebRTC
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-500">
                Secure P2P Connection
              </span>
            </div>
            
            <p className="text-xs text-gray-600 text-center">
              © 2024 Peero • All Rights Reserved
            </p>
          </motion.div>

          {/* Right side - Social links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col items-center lg:items-end gap-3"
          >
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              Connect With Me
            </span>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom section - Features & Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="border-t border-white/5 pt-6 space-y-4"
        >
          {/* Features list */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>No Server Storage</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Instant Connection</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Open Source</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-center text-sm text-gray-500 font-light">
            No servers. No tracking. Just pure{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400 font-medium">
              peer-to-peer magic
            </span>{" "}
            ✨
          </p>
        </motion.div>
      </div>

      {/* Decorative glow effects */}
      <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-primary-600/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-cyan-500/10 blur-3xl -z-10" />
    </motion.footer>
  );
}
