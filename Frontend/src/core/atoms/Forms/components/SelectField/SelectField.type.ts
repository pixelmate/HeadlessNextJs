// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectValue<V = any, D = any> {
  title: string;
  value: V;
  data?: D;
}
