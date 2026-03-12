'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import CodeDisplay from '@/components/CodeDisplay';
import ConnectPanel from '@/components/ConnectPanel';
import ChatPanel from '@/components/ChatPanel';
import ConnectionStatus from '@/components/ConnectionStatus';
import Footer from '@/components/Footer';
import ReturnToChatButton from '@/components/ReturnToChatButton';
import ReconnectPanel from '@/components/ReconnectPanel';
import { usePeerConnection } from '@/hooks/usePeerConnection';

export default function Home() {
  const [inputCode, setInputCode] = useState('');
  const [showReturnButton, setShowReturnButton] = useState(false);
  
  const {
    myCode,
    remoteCode,
    isConnected,
    messages,
    connectionStatus,
    showChat,
    connect,
    sendMessage,
    sendFile,
    downloadFile,
    reconnect,
    goBackToHome,
    returnToChat,
    clearSession,
    hasActiveSession,
  } = usePeerConnection();

  // Check for active session on mount
  useEffect(() => {
    setShowReturnButton(hasActiveSession());
  }, [hasActiveSession]);

  const handleConnect = () => {
    if (inputCode.length === 4) {
      connect(inputCode);
      setInputCode('');
      setShowReturnButton(false);
    }
  };

  const handleReturnToChat = () => {
    returnToChat();
    setShowReturnButton(false);
  };

  const handleClearSession = () => {
    clearSession();
    setShowReturnButton(false);
  };

  const handleBackToHome = () => {
    goBackToHome();
    setShowReturnButton(true);
  };

  const handleReconnect = () => {
    reconnect();
  };

  // Show reconnect panel if in chat but disconnected
  const showReconnectPanel = showChat && !isConnected && connectionStatus === 'disconnected';
  
  // Show chat only if showChat is explicitly true (not just connected)
  const shouldShowChat = showChat;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text">
            Peero
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Connect. Share. Instantly.
          </p>
        </motion.div>

        {/* Connection Status */}
        {!showReconnectPanel && (
          <ConnectionStatus status={connectionStatus} isConnected={isConnected} />
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {showReconnectPanel ? (
            <ReconnectPanel
              onReconnect={handleReconnect}
              onBackToHome={handleBackToHome}
            />
          ) : shouldShowChat ? (
            <ChatPanel
              messages={messages}
              onSendMessage={sendMessage}
              onSendFile={sendFile}
              onDownloadFile={downloadFile}
              onBack={handleBackToHome}
              isConnected={isConnected}
              connectionStatus={connectionStatus}
            />
          ) : (
            <>
              {/* Return to Chat Button */}
              {showReturnButton && (
                <ReturnToChatButton
                  onReturn={handleReturnToChat}
                  onClear={handleClearSession}
                />
              )}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Your Code */}
                <CodeDisplay code={myCode} />
                
                {/* Connect Panel */}
                <ConnectPanel
                  inputCode={inputCode}
                  setInputCode={setInputCode}
                  onConnect={handleConnect}
                  isConnecting={connectionStatus === 'connecting'}
                />
              </motion.div>
            </>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
