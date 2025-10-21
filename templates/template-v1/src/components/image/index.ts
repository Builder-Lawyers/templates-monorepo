import type { Widget } from "@/shared/types.ts";
import ImageWidget from "./index.html?raw";
import { nanoid } from "nanoid";

export const Image: Widget = {
  id: "Image",
  label: "Image",
  component: ImageWidget,
  options: [
    {
      id: nanoid(),
      meta: "image",
      label: "image",
      changeable: {
        src: "https://wallpapers.com/images/hd/lawyer-background-tq7qiiob3gj4tc94.jpg",
        value: "dsasa",
      },
    },
  ],
};
