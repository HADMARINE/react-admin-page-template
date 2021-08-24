import React, { useEffect, useState } from 'react';
import { AdminTableApi, ContainerBase, ExclusiveContainerBase } from '.';
import Color from '../assets/Color';
import { Flex } from '../assets/Wrapper';

interface Props<T extends Record<string, ContainerBase<any>>> {
  contents: T;
  api: AdminTableApi<
    { [P in keyof T]: T[P] extends ContainerBase<infer U> ? U : any }
  >;
}

const AdminTable = function <T extends Record<string, any>>(props: Props<T>) {
  type ApiType = T extends AdminTableApi<infer U> ? U : any;

  const [data, setData] = useState<ApiType['data']>([]);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const [changeIndex, setChangeIndex] = useState(-1);

  useEffect(() => {
    async function f() {
      setData(await props.api({ skip, limit }));
    }

    f();
    return () => {
      return;
    };
  }, [skip, limit]);

  return (
    <Flex vertical>
      <Color.key>
        {data.data?.map((d: any, idx: number) => {
          return (
            <Flex horizontal key={`AdminTable_${idx}`}>
              {Object.entries(props.contents).map(([k, v]) => {
                return (
                  // eslint-disable-next-line no-unused-vars
                  (v as (__props: ExclusiveContainerBase<any>) => JSX.Element)({
                    value: d[k],
                    isChanging: false,
                    name: k,
                    onChange: () => 0,
                  })
                );
              })}
            </Flex>
          );
        })}
      </Color.key>
    </Flex>
  );
};

export default AdminTable;
