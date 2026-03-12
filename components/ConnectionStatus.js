'use client';

import { motion } from 'framer-motion';
import { FiCircle } from 'react-icons/fi';

/**
 * Visual indicator showing current connection status
 * Displays animated status badge with color coding
 */
export default function ConnectionStatus({ status, isConnected }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-green-400',
          bgColor: 'bg-green-400/20',
          borderColor: 'border-green-400/30',
          label: 'Connected',
        };
      case 'connecting':
        return {
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-400/20',
          borderColor: 'border-yellow-400/30',
          label: 'Connecting...',
        };
      case 'disconnected':
        return {
          color: 'text-red-400',
          bgColor: 'bg-red-400/20',
          borderColor: 'border-red-400/30',
          label: 'Disconnected',
        };
      case 'error':
        return {
          color: 'text-red-400',
          bgColor: 'bg-red-400/20',
          borderColor: 'border-red-400/30',
          label: 'Connection Error',
        };
      default:
        return {
          color: 'text-gray-400',
          bgColor: 'bg-gray-400/20',
          borderColor: 'border-gray-400/30',
          label: 'Ready',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center mb-8"
    >
      <div className={`glass ${config.bgColor} border ${config.borderColor} rounded-full px-6 py-3 flex items-center gap-3`}>
        <motion.div
          animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiCircle className={`w-3 h-3 ${config.color} fill-current`} />
        </motion.div>
        <span className={`text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
      </div>
    </motion.div>
  );
}
