// FadeIn.tsx
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  duration?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, duration }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
