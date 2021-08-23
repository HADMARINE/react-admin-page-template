export type ContainerBase<T> = Partial<{
  flex: number;
  value: T;
  onClick: ReactTypes.onClick<HTMLDivElement>;
  onChange: ReactTypes.onChange;
}> & { isChangeState: boolean; name: string };
