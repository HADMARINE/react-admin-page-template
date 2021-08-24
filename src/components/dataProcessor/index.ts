/* eslint-disable id-blacklist */
import StringContainer from './string';

export type ContainerBase<T> = PreferencesContainerBase &
  ExclusiveContainerBase<T>;

export type PreferencesContainerBase = Partial<{
  flex: number;
  onClick: ReactTypes.onClick<HTMLDivElement>;
}>;

export type ExclusiveContainerBase<T> = {
  isChanging: boolean;
  name: string;
  value: T;
  onChange: ReactTypes.onChange;
};

// & Partial<{}>;

export type AdminTableApi<T> = (props: {
  skip: number;
  limit: number;
}) => Promise<{
  result: boolean;
  data: T[];
}>;

// eslint-disable-next-line no-unused-vars
function containerFactory<T>(container: (arg0: T) => JSX.Element) {
  type CType = T extends ContainerBase<any> ? T['value'] : any;
  return (
    pref: Omit<ContainerBase<CType>, keyof ExclusiveContainerBase<CType>>,
  ) => {
    return (ctrl: ExclusiveContainerBase<CType>) => {
      return container(Object.assign(pref, ctrl) as any);
    };
  };
}

// eslint-disable-next-line no-underscore-dangle
export const __DataTypes = {
  string: containerFactory(StringContainer),
};
