import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import type { Pages } from "@/shared/types.ts";
import { Image } from "@/components/image";

export const pages: Pages[] = [
  {
    label: "Home",
    registry: [Header, Hero, Image],
  },
];
