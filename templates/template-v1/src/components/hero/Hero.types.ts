import { z } from "zod";
import {
  baseWidgetSchema,
  ButtonsSchema,
} from "@/components/fabric/shemaDefault.ts";

export const schema = baseWidgetSchema.extend({
  title: z.string(),
  description: z.string().optional(),
  buttons: ButtonsSchema,
});

export type HeroProps = z.infer<typeof schema>;
