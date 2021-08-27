/// <reference types="react-scripts" />

type ReactCustomElementProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

type ValueOf<T> = T[keyof T];
type TypeGuard<T extends (args: any) => any> = T extends (
  args: any,
) => args is infer R
  ? R
  : any;
type Nullish<T> = {
  [P in keyof T]: T[P] | null;
};
type PartialNullish<T> = Partial<Nullish<T>>;
type Arrayify<T> = {
  [P in keyof T]: T[P][];
};
type Some = string | number | boolean | symbol | bigint | object;
type ThenArgRecursive<T> = T extends PromiseLike<infer U>
  ? ThenArgRecursive<U>
  : T;
