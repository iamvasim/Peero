import { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';
import { generateCode } from '@/utils/generateCode';

// Session storage keys
const SESSION_KEYS = {
  MY_CODE: 'peero_my_code',
  REMOTE_CODE: 'peero_remote_code',
  MESSAGES: 'peero_messages',
  IS_CONNECTED: 'peero_is_connected',
};

export function usePeerConnection() {
  const [myCode, setMyCode] = useState('');
  const [remoteCode, setRemoteCode] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [showChat, setShowChat] = useState(false);
  
  const peerRef = useRef(null);
  const connectionRef = useRef(null);

  // Load session from storage on mount
  useEffect(() => {
    const savedMyCode = sessionStorage.getItem(SESSION_KEYS.MY_CODE);
    const savedRemoteCode = sessionStorage.getItem(SESSION_KEYS.REMOTE_CODE);
    const savedMessages = sessionStorage.getItem(SESSION_KEYS.MESSAGES);
    const savedIsConnected = sessionStorage.getItem(SESSION_KEYS.IS_CONNECTED);

    if (savedMyCode) {
      setMyCode(savedMyCode);
      initializePeer(savedMyCode);
    } else {
      const code = generateCode();
      setMyCode(code);
      sessionStorage.setItem(SESSION_KEYS.MY_CODE, code);
      initializePeer(code);
    }

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    }

    if (savedRemoteCode) {
      setRemoteCode(savedRemoteCode);
    }

    if (savedIsConnected === 'true' && savedRemoteCode) {
      setShowChat(true);
    }
  }, []);

  // Save messages to storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(SESSION_KEYS.MESSAGES, JSON.stringify(messages));
    }
  }, [messages]);

  // Save connection state and update showChat when connected
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEYS.IS_CONNECTED, isConnected.toString());
    // Automatically show chat when connected
    if (isConnected) {
      setShowChat(true);
    }
  }, [isConnected]);

  // Initialize PeerJS connection
  const initializePeer = (code) => {
    if (peerRef.current) {
      return; // Already initialized
    }

    // Create peer with generated code as ID
    // Using 0.peerjs.com which is more reliable
    const peer = new Peer(code, {
      host: '0.peerjs.com',
      secure: true,
      port: 443,
      path: '/',
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' }
        ]
      },
      debug: 2,
    });

    peer.on('open', (id) => {
      console.log('My peer ID:', id);
      addSystemMessage('Ready to connect');
    });

    peer.on('connection', (conn) => {
      console.log('Incoming connection from:', conn.peer);
      
      // Check if this is a different peer
      const savedRemoteCode = sessionStorage.getItem(SESSION_KEYS.REMOTE_CODE);
      if (savedRemoteCode && savedRemoteCode !== conn.peer) {
        // Different peer connecting - clear old messages
        setMessages([]);
        sessionStorage.removeItem(SESSION_KEYS.MESSAGES);
      }
      
      setupConnection(conn);
      setRemoteCode(conn.peer);
      sessionStorage.setItem(SESSION_KEYS.REMOTE_CODE, conn.peer);
      // Automatically show chat when someone connects to you
      setShowChat(true);
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
      setConnectionStatus('error');
      
      // More descriptive error messages
      if (err.type === 'peer-unavailable') {
        addSystemMessage('Peer not found. Make sure they entered your code correctly.');
      } else if (err.type === 'network') {
        addSystemMessage('Network error. Check your internet connection.');
      } else if (err.type === 'server-error') {
        addSystemMessage('Server error. Please refresh and try again.');
      } else if (err.type === 'unavailable-id') {
        addSystemMessage('This code is already in use. Please refresh the page.');
      } else if (err.type === 'disconnected') {
        addSystemMessage('Disconnected from server. Refreshing...');
        // Auto-refresh on disconnect
        setTimeout(() => window.location.reload(), 2000);
      } else {
        addSystemMessage(`Connection error: ${err.type}. Try refreshing.`);
      }
    });

    peer.on('disconnected', () => {
      console.log('Disconnected from PeerJS server');
      // Try to reconnect
      if (peerRef.current && !peerRef.current.destroyed) {
        peerRef.current.reconnect();
      }
    });

    peerRef.current = peer;
  };

  // Setup connection handlers
  const setupConnection = useCallback((conn) => {
    connectionRef.current = conn;
    setConnectionStatus('connecting');

    conn.on('open', () => {
      console.log('Connection established');
      setIsConnected(true);
      setConnectionStatus('connected');
      addSystemMessage('Connected successfully');
    });

    conn.on('data', (data) => {
      console.log('Received data:', data);
      
      if (data.type === 'text') {
        addMessage({
          id: Date.now().toString(),
          type: 'text',
          content: data.content,
          sender: 'peer',
          timestamp: new Date(),
        });
      } else if (data.type === 'file') {
        // Handle file transfer
        const message = {
          id: Date.now().toString(),
          type: 'file',
          content: `Received file: ${data.fileName}`,
          sender: 'peer',
          timestamp: new Date(),
          fileName: data.fileName,
          fileSize: data.fileSize,
          fileData: data.fileData,
        };
        addMessage(message);
        
        // Don't auto-download - user will click to download
      }
    });

    conn.on('close', () => {
      console.log('Connection closed');
      setIsConnected(false);
      setConnectionStatus('disconnected');
      addSystemMessage('Connection closed');
      connectionRef.current = null;
    });

    conn.on('error', (err) => {
      console.error('Connection error:', err);
      setConnectionStatus('error');
      addSystemMessage('Connection error occurred');
    });
  }, []);

  // Connect to peer
  const connect = useCallback((code) => {
    if (!peerRef.current) return;
    
    // Check if connecting to a different peer
    const savedRemoteCode = sessionStorage.getItem(SESSION_KEYS.REMOTE_CODE);
    if (savedRemoteCode && savedRemoteCode !== code) {
      // Connecting to a different peer - clear old messages
      setMessages([]);
      sessionStorage.removeItem(SESSION_KEYS.MESSAGES);
    }
    
    setConnectionStatus('connecting');
    addSystemMessage(`Connecting to ${code}...`);
    setRemoteCode(code);
    sessionStorage.setItem(SESSION_KEYS.REMOTE_CODE, code);

    const conn = peerRef.current.connect(code, {
      reliable: true,
    });

    setupConnection(conn);
    setShowChat(true);
  }, [setupConnection]);

  // Reconnect to existing session
  const reconnect = useCallback(() => {
    const savedRemoteCode = sessionStorage.getItem(SESSION_KEYS.REMOTE_CODE);
    if (savedRemoteCode && peerRef.current) {
      connect(savedRemoteCode);
    }
  }, [connect]);

  // Go back to home screen
  const goBackToHome = useCallback(() => {
    setShowChat(false);
    // Don't disconnect, just hide the chat
  }, []);

  // Return to active chat
  const returnToChat = useCallback(() => {
    setShowChat(true);
    if (!isConnected && remoteCode) {
      // Try to reconnect
      reconnect();
    }
  }, [isConnected, remoteCode, reconnect]);

  // Clear session
  const clearSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEYS.REMOTE_CODE);
    sessionStorage.removeItem(SESSION_KEYS.MESSAGES);
    sessionStorage.removeItem(SESSION_KEYS.IS_CONNECTED);
    setMessages([]);
    setRemoteCode('');
    setIsConnected(false);
    setShowChat(false);
    if (connectionRef.current) {
      connectionRef.current.close();
      connectionRef.current = null;
    }
  }, []);

  // Check if session exists
  const hasActiveSession = useCallback(() => {
    const savedRemoteCode = sessionStorage.getItem(SESSION_KEYS.REMOTE_CODE);
    const savedMessages = sessionStorage.getItem(SESSION_KEYS.MESSAGES);
    return !!(savedRemoteCode || (savedMessages && JSON.parse(savedMessages).length > 0));
  }, []);

  // Send text message
  const sendMessage = useCallback((content) => {
    if (!connectionRef.current || !isConnected) return;

    const message = {
      id: Date.now().toString(),
      type: 'text',
      content,
      sender: 'me',
      timestamp: new Date(),
    };

    connectionRef.current.send({
      type: 'text',
      content,
    });

    addMessage(message);
  }, [isConnected]);

  // Send file
  const sendFile = useCallback((file) => {
    if (!connectionRef.current || !isConnected) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const fileData = e.target?.result;
      
      connectionRef.current?.send({
        type: 'file',
        fileName: file.name,
        fileSize: file.size,
        fileData: fileData,
      });

      const message = {
        id: Date.now().toString(),
        type: 'file',
        content: `Sent file: ${file.name}`,
        sender: 'me',
        timestamp: new Date(),
        fileName: file.name,
        fileSize: file.size,
      };

      addMessage(message);
    };

    reader.readAsArrayBuffer(file);
  }, [isConnected]);

  // Helper functions
  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const addSystemMessage = (content) => {
    const message = {
      id: Date.now().toString(),
      type: 'system',
      content,
      sender: 'system',
      timestamp: new Date(),
    };
    addMessage(message);
  };

  const downloadFile = (fileData, fileName) => {
    const blob = new Blob([fileData]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
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
  };
}
