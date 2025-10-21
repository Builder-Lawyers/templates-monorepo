import Handlebars from "handlebars";
import type { WidgetOptions, MetaOptions, ListOption } from "@/shared/types.ts";

function flattenOption(opt: MetaOptions): any {
  if (opt.meta === "list") {
    const list = opt as ListOption;
    const items = list.changeable?.items ?? [];
    return {
      items: items.map(flattenOption),
    };
  }

  if ("changeable" in opt && opt.changeable) {
    return { ...opt.changeable };
  }

  return {};
}

export function renderWidget(template: string, options: WidgetOptions) {
  const context = options.reduce<Record<string, any>>((acc, opt) => {
    if (opt.meta === "list") {
      const list = opt as ListOption;
      const items = list.changeable?.items ?? [];
      acc[list.label] = { items: items.map(flattenOption) };
    } else {
      acc[opt.label] = flattenOption(opt);
    }
    return acc;
  }, {});

  console.log("render context:", context);

  const compiled = Handlebars.compile(template);
  return compiled(context);
}
