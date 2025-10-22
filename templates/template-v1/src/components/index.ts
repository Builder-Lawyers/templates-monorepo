import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import type { Pages } from "@/shared/types.ts";
import { Image } from "@/components/image";
import { writeFileSync } from "node:fs";
import path from "node:path";

export const pages: Pages[] = [
  {
    label: "Home",
    registry: [Header, Hero, Image],
  },
];

const filePath = path.resolve("./pages.json");
writeFileSync(filePath, JSON.stringify(pages, null, 2), "utf8");
