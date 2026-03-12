'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPaperclip, FiArrowLeft } from 'react-icons/fi';
import MessageBubble from './MessageBubble';

/**
 * Main chat interface for sending/receiving messages and files
 * Features auto-scroll, file upload, and smooth animations
 */
export default function ChatPanel({
  messages,
  onSendMessage,
  onSendFile,
  onDownloadFile,
  onBack,
  isConnected,
  connectionStatus,
}) {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendFile(file);
      e.target.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden max-w-4xl mx-auto"
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary-600/20 to-cyan-500/20 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-gray-300 hover:text-white"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </motion.button>
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Chat & File Transfer</h2>
              <p className="text-sm text-gray-400 mt-1">
                {isConnected ? 'Connected • End-to-end encrypted' : 'Connection lost'}
              </p>
            </div>
          </div>
          
          {/* Connection indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-xs text-gray-400">
              {connectionStatus === 'connected' ? 'Online' : connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                index={index}
                onDownload={onDownloadFile}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4 bg-white/5">
        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Attach file"
          >
            <FiPaperclip className="w-5 h-5 text-gray-400" />
          </motion.button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-cyan-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <FiSend className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
