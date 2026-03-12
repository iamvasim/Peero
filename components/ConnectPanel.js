'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

/**
 * Panel for entering a peer's code and initiating connection
 * Includes input validation and loading states
 */
export default function ConnectPanel({
  inputCode,
  setInputCode,
  onConnect,
  isConnecting,
}) {
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setInputCode(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputCode.length === 4) {
      onConnect();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 glow-hover transition-all duration-300"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">Connect to Peer</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Enter their 4-digit code to start sharing
      </p>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={inputCode}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="0000"
            maxLength={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-4xl font-bold tracking-wider text-center focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
            disabled={isConnecting}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConnect}
          disabled={inputCode.length !== 4 || isConnecting}
          className="w-full bg-gradient-to-r from-primary-600 to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              Connect
              <FiArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>

      <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
        <p className="text-xs text-gray-400 text-center">
          Make sure both users are online and have entered each other's codes
        </p>
      </div>
    </motion.div>
  );
}
