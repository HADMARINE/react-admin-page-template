import StringContainer from '@src/components/dataProcessor/containers/String';
import EnumContainer from './containers/Enum';

export type ContainerBase<T> = PreferencesContainerBase &
  ExclusiveContainerBase<T>;

export type PreferencesContainerBase = Partial<{
  onClick: ReactTypes.onClick<HTMLDivElement>;
  title: string;
  sortable: boolean;
  verifier?: (value: any) => string | undefined;
}>;

// this type must include only controlling vars
export type ExclusiveContainerBase<T> = {
  isChanging: boolean;
  onChange: ReactTypes.onChange;
  value?: T;
  key: string;
  error: string | undefined;
  setError: (value: string) => void;
};

export type AdminTableGetApi<T> = (props: {
  skip: number;
  limit: number;
  order?: { target: string; direction: 'asc' | 'desc' };
  query?: Record<string, any>;
}) => Promise<
  {
    result: boolean;
    data: T[];
  } & Partial<{
    length: number;
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
  return (pref: Omit<T, keyof ExclusiveContainerBase<CType>>) => {
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
  enum: containerFactory(EnumContainer),
};
