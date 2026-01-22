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

import { writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.resolve("./pages.json");
writeFileSync(filePath, JSON.stringify(pages, null, 2), "utf8");
