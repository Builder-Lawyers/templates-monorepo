import { z, type ZodObject, type ZodTypeAny } from "zod";

// ========================== TYPES ==========================

type ModuleWithSchema = {
  schema: ZodTypeAny;
};

type AstroComponent<Props = any> = (props: Props) => any;

type WidgetModule = Record<string, unknown>;

type ModulesMap = Record<string, WidgetModule>;

// ===================== CREATE SCHEMA =======================

export function createWidgetSchemaFrom(modules: ModulesMap) {
  const widgets = Object.entries(modules).map(([path, mod]) => {
    const type = path.split("/").pop()?.split(".")[0]?.toLowerCase();
    if (!type) throw new Error(`Can't get types from: ${path}`);

    const schema = Object.values(mod).find(
      (v) =>
        typeof v === "object" &&
        v !== null &&
        typeof (v as any).safeParse === "function",
    );

    if (!schema) {
      throw new Error(`File ${path} doesn't export a valid schema.`);
    }

    return z.object({
      type: z.literal(type),
      props: schema as ZodObject<any>,
    });
  });

  if (widgets.length === 0) {
    throw new Error("Widget schema is empty.");
  }

  return z.discriminatedUnion(
    "type",
    widgets as [ZodObject<any>, ...ZodObject<any>[]],
  );
}

// ====================== SCHEMA IMPORTS =====================

const schemaModules = import.meta.glob<ModuleWithSchema>("../*/**/*.types.ts", {
  eager: true,
});

export const WidgetSchema = createWidgetSchemaFrom(schemaModules);

// ====================== ASTRO FACTORY =======================

const modules = import.meta.glob<{ default: AstroComponent<any> }>(
  "../*/**/*.astro",
  { eager: true },
);

export const astroFactory: Record<string, AstroComponent<any>> = {};

for (const path in modules) {
  const key = path.split("/").pop()?.replace(".astro", "").toLowerCase();

  if (key) astroFactory[key] = modules[path].default;
}

// ====================== PAGE SCHEMAS =======================

export const PageSchema = z.object({
  title: z.string(),
  slug: z.string().optional().nullable(),
  widgets: z.array(WidgetSchema),
});

const ColorSchema = z.object({
  main: z.string(),
  accent: z.string(),
});

const GlobalPropsSchema = z.object({
  type: z.literal("global"),
  logo: z.string(),
  colors: ColorSchema,
  widgets: z.array(WidgetSchema),
});

export const GlobalSchema = z.object({
  type: z.literal("global"),
  props: GlobalPropsSchema,
});

export const PageDataSchema = z.object({
  global: GlobalSchema.optional(),
  pages: z.array(PageSchema),
});

// ========================= TYPES ===========================

export type Page = z.infer<typeof PageSchema>;
export type PageData = z.infer<typeof PageDataSchema>;
export type Global = z.infer<typeof GlobalSchema>;
export type Widget = z.infer<typeof WidgetSchema>;

// ======================= UTILS =============================
