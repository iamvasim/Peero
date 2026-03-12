'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Animated background with floating geometric shapes and gradient mesh
 * Creates a futuristic, dynamic visual effect
 */
export default function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    // Set dimensions on client side only
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />
      
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Geometric Shapes */}
      {[...Array(6)].map((_, i) => {
        const randomX1 = Math.random() * dimensions.width;
        const randomY1 = Math.random() * dimensions.height;
        const randomX2 = Math.random() * dimensions.width;
        const randomY2 = Math.random() * dimensions.height;
        const randomX3 = Math.random() * dimensions.width;
        const randomY3 = Math.random() * dimensions.height;

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: randomX1,
              y: randomY1,
            }}
            animate={{
              x: [randomX1, randomX2, randomX3],
              y: [randomY1, randomY2, randomY3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {i % 2 === 0 ? (
              <div className="w-20 h-20 border border-primary-500/20 rounded-lg backdrop-blur-sm" />
            ) : (
              <div className="w-16 h-16 border border-cyan-400/20 rounded-full backdrop-blur-sm" />
            )}
          </motion.div>
        );
      })}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
