"use client";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { FC} from "react";
import { useEffect, useRef } from "react";

type CounterProps = {
  from: number;
  to: number;
};

export const AnimatedCounter:FC<CounterProps> = ({ from, to }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref);

  // while in view animate the count
  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: 2 });
    }
  }, [count, inView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
