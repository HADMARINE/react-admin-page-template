import StringContainer from '@src/components/dataProcessor/containers/String';
import DateTimeContainer from './containers/DateTime';
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
  key?: string;
  error?: string | undefined;
};

export type ContainerTypes = 'string' | 'enum' | 'datetime';

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

export function containerFactory<T>(
  container: (arg0: T) => JSX.Element,
  type: ContainerTypes,
) {
  type CType = T extends ContainerBase<any> ? T['value'] : any;
  return (pref: Omit<T, keyof ExclusiveContainerBase<CType>>) => {
    return {
      func: (ctrl: ExclusiveContainerBase<CType>) => {
        return container(Object.assign(pref, ctrl) as any);
      },
      pref: Object.assign(pref, { containerType: type }),
    };
  };
}

export const __DataTypes = {
  // eslint-disable-next-line id-blacklist
  string: containerFactory(StringContainer, 'string'),
  enum: containerFactory(EnumContainer, 'enum'),
  dateTime: containerFactory(DateTimeContainer, 'datetime'),
};
