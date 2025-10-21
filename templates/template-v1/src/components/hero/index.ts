import HeroTemplate from "./hero.html?raw";
import type { Widget } from "@/shared/types.ts";
import { nanoid } from "nanoid";

export const Hero: Widget = {
  id: "hero_1",
  label: "Hero",
  component: HeroTemplate,
  options: [
    {
      id: nanoid(),
      meta: "text",
      label: "title",
      changeable: { value: "Title of Hero." },
    },
    {
      id: nanoid(),
      meta: "button",
      label: "button",
      kind: "default",
      changeable: { value: "Let's connect" },
    },
    {
      id: nanoid(),
      meta: "text",
      label: "description",
      changeable: {
        value:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit quisque faucibus ex sapien vitae pellentesque. Vitae pellentesque sem placerat in id cursus mi. Cursus mi pretium tellus duis convallis tempus leo. Tempus leo eu aenean sed diam urna tempor. Urna tempor pulvinar vivamus fringilla lacus nec metus.",
      },
    },
  ],
};
