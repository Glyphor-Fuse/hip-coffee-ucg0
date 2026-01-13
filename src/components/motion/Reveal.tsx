import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: delay
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={shouldReduceMotion ? "visible" : "visible"}
      viewport={{ once: true, margin: "-50px" }}
      variants={shouldReduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : variants}
    >
      {children}
    </motion.div>
  );
};
