import React, { useEffect, useState } from 'react';
import { AdminTableApi, ContainerBase, ExclusiveContainerBase } from '.';
import Color from '../assets/Color';
import { Flex } from '../assets/Wrapper';
import colorSettings from '@settings/color.json';

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
        <Flex horizontal>
          {Object.entries(props.contents).map(([k, v], _idx) => {
            return (
              <Flex
                style={{
                  border: '1px solid',
                  borderRadius: '5px',
                  fontSize: '24px',
                  margin: '1px',
                  backgroundColor: colorSettings.keyColor,
                  color: colorSettings.backgroundColor,
                }}
                key={`AdminTable_title_iter_${_idx}`}
                flex={v.pref.flex || 1}>
                <Flex style={{ marginLeft: '5px' }}>
                  {
                    (
                      v as {
                        func: (
                          __props: ExclusiveContainerBase<any>,
                        ) => JSX.Element;
                        pref: Omit<
                          ContainerBase<any>,
                          keyof ExclusiveContainerBase<any>
                        >;
                      }
                    ).pref.title
                  }
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        {data.data?.map((d: any, idx: number) => {
          return (
            <Flex
              horizontal
              key={`AdminTable_${idx}`}
              style={{ border: '1px solid', marginTop: '-1px' }}>
              {Object.entries(props.contents).map(([k, v], __idx) => {
                return (
                  <Flex
                    flex={v.pref.flex || 1}
                    style={{ borderRight: '1px solid', marginRight: '-1px' }}
                    key={`AdminPage__idx_${__idx}`}>
                    {(
                      v as {
                        func: (
                          __props: ExclusiveContainerBase<any>,
                        ) => JSX.Element;
                        pref: Omit<
                          ContainerBase<any>,
                          keyof ExclusiveContainerBase<any>
                        >;
                      }
                    ).func({
                      value: d[k],
                      isChanging: false,
                      name: k,
                      onChange: () => 0, // todo this
                    })}
                  </Flex>
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
