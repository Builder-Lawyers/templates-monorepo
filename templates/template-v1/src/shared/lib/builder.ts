import { Handlebars } from "./hb";

type Option =
  | {
      meta: "text" | "button" | "image";
      label: string;
      kind?: string;
      changeable: Record<string, any>;
      id: string;
    }
  | {
      meta: "list";
      label: string;
      changeable: { items: Array<any> };
      id: string;
    };

type RegistryItem = {
  id: string;
  label: string;
  component: string;
  options: Option[];
};

type PageDoc = {
  label: string;
  registry: RegistryItem[];
};

function optionsToContext(options: Option[]) {
  const ctx: Record<string, any> = {};

  for (const opt of options) {
    const key = opt.label;

    if (opt.meta === "list") {
      // Нормалізуємо items до простого виду
      const items = (opt.changeable?.items ?? []).map((it: any) => {
        // у вас елемент має changeable: {href, value}
        if (it?.changeable)
          return {
            ...it.changeable,
            id: it.id,
            meta: it.meta,
            label: it.label,
            kind: it.kind,
          };
        return it;
      });

      ctx[key] = { items };
      continue;
    }

    ctx[key] = { ...opt.changeable };
  }

  return ctx;
}

function compileTemplate(template: string) {
  return Handlebars.compile(template, {
    noEscape: false,
  });
}

export function renderRegistry(registry: RegistryItem[]) {
  return registry.map((block, index) => {
    const context = optionsToContext(block.options);
    const tpl = compileTemplate(block.component);
    const html = tpl(context);
    const key = `${block.id}__${index}`;

    return { key, id: block.id, label: block.label, html };
  });
}

export function findPage(pages: PageDoc[], label: string) {
  return pages.find((p) => p.label === label);
}
