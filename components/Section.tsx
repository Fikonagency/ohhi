"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`px-6 md:px-10 py-20 md:py-28 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
