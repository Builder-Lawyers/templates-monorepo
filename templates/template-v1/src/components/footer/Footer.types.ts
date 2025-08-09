import { z } from "zod";
import {
  baseWidgetSchema,
  ButtonsSchema,
} from "@/components/fabric/shemaDefault.ts";

export const schema = baseWidgetSchema.extend({
  title: z.string().max(20),
});

export type FooterProps = z.infer<typeof schema>;
