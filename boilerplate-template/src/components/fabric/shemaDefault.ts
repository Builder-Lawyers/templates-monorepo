import z from "zod";

export const baseWidgetSchema = z.object({
  id: z.string(),
});

export const ButtonsSchema = z
  .array(
    z.object({
      name: z.string().optional(),
      label: z.string(),
      href: z.string(),
    }),
  )
  .optional();
