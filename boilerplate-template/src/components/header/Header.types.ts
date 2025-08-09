import { z } from "zod";
import {
  baseWidgetSchema,
  ButtonsSchema,
} from "@/components/fabric/shemaDefault.ts";

export const schema = baseWidgetSchema.extend({
  title: z.string().max(20),
  navigation: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
  buttons: ButtonsSchema,
});

export type HeaderProps = z.infer<typeof schema>;
