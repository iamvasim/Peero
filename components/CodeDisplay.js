'use client';

import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

/**
 * Displays the user's connection code with copy functionality
 * Features glassmorphism design and smooth animations
 */
export default function CodeDisplay({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 glow-hover transition-all duration-300"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">Your Code</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Share this code with someone to connect
      </p>
      
      <div className="relative">
        <div className="bg-gradient-to-r from-primary-600 to-cyan-500 p-[2px] rounded-xl">
          <div className="bg-[#0a0a0f] rounded-xl p-6 flex items-center justify-between">
            <span className="text-5xl font-bold tracking-wider gradient-text">
              {code}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="ml-4 p-3 rounded-lg bg-primary-600/20 hover:bg-primary-600/30 transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <FiCheck className="w-6 h-6 text-green-400" />
              ) : (
                <FiCopy className="w-6 h-6 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {copied && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-green-400 text-sm mt-4 text-center"
        >
          Code copied to clipboard!
        </motion.p>
      )}
    </motion.div>
  );
}
