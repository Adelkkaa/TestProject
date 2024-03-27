import type { Variants } from "framer-motion";

export const FlexItemAnimation: Variants = {
    initial: (custom = 1) => ({
      opacity: 0,
      x: custom * 200,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
  };
