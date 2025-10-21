import HeaderTemplate from "./index.html?raw";
import type { Widget } from "@/shared/types.ts";
import { nanoid } from "nanoid";

export const Header: Widget = {
  id: "header_1",
  label: "Header",
  component: HeaderTemplate,
  options: [
    {
      id: nanoid(),
      meta: "list",
      label: "links",
      changeable: {
        items: [
          {
            id: nanoid(),
            meta: "button",
            label: "Page button",
            kind: "link",
            changeable: { href: "https://google.com", value: "Google" },
          },
          {
            id: nanoid(),
            meta: "button",
            label: "Page button",
            kind: "link",
            changeable: { href: "https://yandex.com", value: "Yandex" },
          },
        ],
      },
    },
    {
      id: nanoid(),
      meta: "text",
      label: "title",
      changeable: { value: "Builder" },
    },
    {
      id: nanoid(),
      meta: "button",
      label: "contact_me_button",
      kind: "link",
      changeable: { href: "#", value: "Contact Me" },
    },
  ],
};
