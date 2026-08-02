"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/cn";

export function InteractiveCard({ className, ...props }: HTMLMotionProps<"article">) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      className={cn("interactive-card", className)}
      whileHover={reduced ? undefined : { y: -10, rotate: -0.35 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      {...props}
    />
  );
}
