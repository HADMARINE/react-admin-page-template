import StringContainer from '@src/components/dataProcessor/containers/String';

export type ContainerBase<T> = PreferencesContainerBase &
  ExclusiveContainerBase<T>;

export type PreferencesContainerBase = Partial<{
  flex: number;
  onClick: ReactTypes.onClick<HTMLDivElement>;
  title: string;
}>;

// this type must include only dom controlling vars
export type ExclusiveContainerBase<T> = {
  isChanging: boolean;
  name: string;
  value: T;
  onChange: ReactTypes.onChange;
};

// & Partial<{}>;

export type AdminTableGetApi<T> = (props: {
  skip: number;
  limit: number;
}) => Promise<
  {
    result: boolean;
    data: T[];
  } & Partial<{
    length: number;
    sortMethod: string[];
  }>
>;

export function AdminTableGetApiDataProcessor<T extends Record<string, any>>(
  props: T,
): ThenArgRecursive<ReturnType<AdminTableGetApi<T>>> {
  return {
    result: props.result,
    data: props.data.data,
    length: props.data.length,
  };
}

// eslint-disable-next-line no-unused-vars
function containerFactory<T>(container: (arg0: T) => JSX.Element) {
  type CType = T extends ContainerBase<any> ? T['value'] : any;
  return (
    pref: Omit<ContainerBase<CType>, keyof ExclusiveContainerBase<CType>>,
  ) => {
    return {
      func: (ctrl: ExclusiveContainerBase<CType>) => {
        return container(Object.assign(pref, ctrl) as any);
      },
      pref,
    };
  };
}

export const __DataTypes = {
  // eslint-disable-next-line id-blacklist
  string: containerFactory(StringContainer),
};
