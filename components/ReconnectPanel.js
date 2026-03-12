'use client';

import { motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCw, FiHome } from 'react-icons/fi';

/**
 * Panel shown when connection is lost
 * Offers reconnect or return to home options
 */
export default function ReconnectPanel({ onReconnect, onBackToHome }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 max-w-md mx-auto text-center"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block mb-6"
      >
        <div className="p-4 rounded-full bg-yellow-500/20">
          <FiAlertCircle className="w-12 h-12 text-yellow-400" />
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold text-gray-200 mb-3">
        Connection Lost
      </h2>
      <p className="text-gray-400 mb-8">
        Your connection to the peer was interrupted. You can try to reconnect or return to the home screen.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackToHome}
          className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FiHome className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReconnect}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-cyan-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FiRefreshCw className="w-5 h-5" />
          Reconnect
        </motion.button>
      </div>
    </motion.div>
  );
}
