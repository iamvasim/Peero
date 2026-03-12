'use client';

import { motion } from 'framer-motion';
import { FiFile, FiDownload } from 'react-icons/fi';
import { formatFileSize } from '@/utils/formatFileSize';
import { cn } from '@/utils/cn';

/**
 * Individual message bubble component
 * Handles text messages, file transfers, and system messages
 * with appropriate styling and animations
 */
export default function MessageBubble({ message, index, onDownload }) {
  const isMe = message.sender === 'me';
  const isSystem = message.sender === 'system';

  const handleDownload = () => {
    if (message.fileData && message.fileName) {
      onDownload(message.fileData, message.fileName);
    }
  };

  // Format timestamp safely
  const formatTime = (timestamp) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  // System messages (connection status, etc.)
  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="flex justify-center"
      >
        <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400">
          {message.content}
        </div>
      </motion.div>
    );
  }

  // File message
  if (message.type === 'file') {
    return (
      <motion.div
        initial={{ opacity: 0, x: isMe ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={cn('flex', isMe ? 'justify-end' : 'justify-start')}
      >
        <div
          className={cn(
            'max-w-md rounded-2xl p-4 space-y-2',
            isMe
              ? 'bg-gradient-to-r from-primary-600 to-cyan-500'
              : 'bg-white/10 border border-white/10'
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              'p-3 rounded-lg',
              isMe ? 'bg-white/20' : 'bg-white/10'
            )}>
              <FiFile className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{message.fileName}</p>
              <p className="text-sm opacity-75">
                {message.fileSize ? formatFileSize(message.fileSize) : 'Unknown size'}
              </p>
            </div>
            {!isMe && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Download file"
              >
                <FiDownload className="w-5 h-5" />
              </motion.button>
            )}
          </div>
          <p className="text-xs opacity-75">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </motion.div>
    );
  }

  // Text message
  return (
    <motion.div
      initial={{ opacity: 0, x: isMe ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn('flex', isMe ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-md rounded-2xl px-4 py-3',
          isMe
            ? 'bg-gradient-to-r from-primary-600 to-cyan-500'
            : 'bg-white/10 border border-white/10'
        )}
      >
        <p className="break-words">{message.content}</p>
        <p className="text-xs opacity-75 mt-1">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}
