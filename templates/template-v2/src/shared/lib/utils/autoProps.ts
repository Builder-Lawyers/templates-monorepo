import { z, ZodObject } from "zod";
import { convertZodToMeta } from "@/shared/lib/utils/zodToMeta.ts";

type KeyMap = Map<unknown, string>;

function getSchemaAtPath(
  schema: z.ZodTypeAny,
  path: string,
): z.ZodTypeAny | undefined {
  const parts = path.split(".");
  let current: z.ZodTypeAny | undefined = schema;

  for (const part of parts) {
    if (current instanceof z.ZodObject) {
      const shape = current.shape;
      current = shape[part];
    } else if (current instanceof z.ZodArray) {
      current = current._def.type;
    } else {
      return undefined;
    }
  }

  return current;
}

export function autoProps<T extends object>(
  props: T,
  schema?: ZodObject<any>,
): T & {
  $: (
    value: unknown,
    root?: boolean,
    short?: boolean,
  ) => Record<string, string>;
} {
  const keyMap: KeyMap = new Map();
  const widgetId = (props as any)?.id;

  function makeProxy(obj: any, path: string[] = []): any {
    if (obj === null || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      const proxyArray = obj.map((item, index) => {
        const currentPath = [...path, index.toString()];
        keyMap.set(item, currentPath.join("."));
        return makeProxy(item, currentPath);
      });
      keyMap.set(proxyArray, path.join("."));
      return proxyArray;
    }

    const proxy: any = new Proxy(obj, {
      get(target, prop: string | symbol) {
        if (typeof prop === "symbol") return target[prop];
        const value = target[prop];
        const currentPath = [...path, prop.toString()];
        keyMap.set(value, currentPath.join("."));
        return makeProxy(value, currentPath);
      },
    });

    keyMap.set(proxy, path.join("."));
    return proxy;
  }

  const proxy = makeProxy(props);

  if (!Object.prototype.hasOwnProperty.call(proxy, "$")) {
    Object.defineProperty(proxy, "$", {
      value: (
        value: unknown,
        root = false,
        short = false,
      ): Record<string, string> => {
        const key = keyMap.get(value);
        const attr: Record<string, string> = {};

        if (key) {
          attr["data-prop"] = short ? key.split(".").at(-1)! : key;

          if (schema) {
            const fieldSchema = getSchemaAtPath(schema, key);

            if (fieldSchema) {
              try {
                attr["data-validation"] = JSON.stringify(
                  convertZodToMeta(fieldSchema),
                );
              } catch (err) {
                console.warn("Cannot convert validation for", key);
              }
            }
          }
        }

        if (root && typeof widgetId === "string") {
          attr["data-widget-id"] = widgetId;
        }

        return attr;
      },
      enumerable: false,
    });
  }

  return proxy as any;
}
