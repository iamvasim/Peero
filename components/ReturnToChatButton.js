'use client';

import { motion } from 'framer-motion';
import { FiMessageCircle, FiRefreshCw } from 'react-icons/fi';

/**
 * Button to return to an active chat session
 * Shows when a previous session exists
 */
export default function ReturnToChatButton({ onReturn, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 mb-6 border-2 border-primary-500/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary-500/20">
            <FiMessageCircle className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-200">Active Session Found</h3>
            <p className="text-sm text-gray-400 mt-1">
              You have an ongoing chat session
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            Clear Session
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReturn}
            className="px-6 py-2 bg-gradient-to-r from-primary-600 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            Return to Chat
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
