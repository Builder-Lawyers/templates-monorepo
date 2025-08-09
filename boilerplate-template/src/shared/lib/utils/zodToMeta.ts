export function convertZodToMeta(schema: any): Record<string, any> {
  const def = schema._def;

  throw new Error("Unsupported Zod type: " + def.type);
}
