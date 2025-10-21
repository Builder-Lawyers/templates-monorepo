interface BaseOptions<Meta extends string, Changeable> {
  id: string;
  meta: Meta;
  label: string;
  changeable: Changeable;
}

export type TextOption = BaseOptions<"text", { value: string }>;
export type ImageOption = BaseOptions<"image", { src: string; value: string }>;
export type LinkOption = BaseOptions<"link", { href: string; value: string }>;

export type ButtonOption =
  | (BaseOptions<"button", { value: string }> & {
      kind: "default";
    })
  | (BaseOptions<"button", { value: string; href: string }> & {
      kind: "link";
    });

export interface ListOption
  extends BaseOptions<"list", { items: MetaOptions[] }> {
  maxItems?: number;
  minItems?: number;
}

export type MetaOptions =
  | TextOption
  | ImageOption
  | LinkOption
  | ButtonOption
  | ListOption;

export type WidgetOptions = MetaOptions[];

export interface Widget {
  id: string;
  label: string;
  component: string;
  options: WidgetOptions;
}

export interface Pages {
  label: string;
  registry: Widget[];
}
