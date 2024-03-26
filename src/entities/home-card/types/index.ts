import type { StaticImageData } from "next/image";

export type IHomeCardProps = {
    title: string;
    description: string;
    image: StaticImageData;
    isReverse: boolean;
  };