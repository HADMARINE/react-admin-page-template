import React, { useEffect, useState } from 'react';
import { AdminTableGetApi, ContainerBase, ExclusiveContainerBase } from '.';
import Color from '../assets/Color';
import { Flex } from '../assets/Wrapper';
import colorSettings from '@settings/color.json';
import Button from '../assets/Button';
import { Margin } from '../assets/Format';
import Img from '../assets/Img';

import deleteImg from '@src/assets/delete_512.png';
import modifyImg from '@src/assets/modify_200.png';
import ReactModal from 'react-modal';

interface Props<T extends Record<string, ContainerBase<any>>> {
  contents: T;
  getApi: AdminTableGetApi<
    { [P in keyof T]: T[P] extends ContainerBase<infer U> ? U : any }
  >;
  patchApi?: (data: Record<string, any>) => Promise<{ result: boolean }>;
  deleteApi?: (data: Record<string, any>) => Promise<{ result: boolean }>;
}

const getPaginationCount = (length: number, limit: number) => {
  return Math.floor(length / limit) + (length % limit === 0 ? 0 : 1) || 1;
};

const PaginationButton = (props: {
  data: any;
  limit: number;
  pageIdx: number;
  setPageIdx: (arg0: number) => void;
}): JSX.Element[] => {
  const arr = [];
  for (let i = 0; i < getPaginationCount(props.data.length, props.limit); i++) {
    arr.push(
      <Button
        width={'30px'}
        height={'40px'}
        style={{
          marginLeft: '2px',
          border: `1px solid ${colorSettings.keyColor}`,
        }}
        variant={props.pageIdx === i ? 'primary-inversed' : 'primary'}
        onClick={() => props.setPageIdx(i)}>
        {i + 1}
      </Button>,
    );
  }

  return arr;
};

const AdminTable = function <T extends Record<string, any>>(props: Props<T>) {
  type ApiType = T extends AdminTableGetApi<infer U> ? U : any;

  const [data, setData] = useState<ApiType['data']>([]);

  const [pageIdx, setPageIdx] = useState(0);
  const [limit, setLimit] = useState(10);

  const [modifyIdx, setModifyIdx] = useState(-1);
  const [deleteIdx, setDeleteIdx] = useState(-1);

  useEffect(() => {
    async function f() {
      setData(await props.getApi({ skip: pageIdx * 10, limit }));
    }

    f();
    return () => {
      return;
    };
  }, [pageIdx, limit]);

  return (
    <>
      <Flex vertical>
        <Color.key>
          <Flex horizontal>
            {Object.entries(props.contents).map(([k, v], _idx) => {
              return (
                <Flex
                  style={{
                    border: '1px solid',
                    borderRadius: '10px',
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
            <Flex
              style={{
                border: '1px solid',
                borderRadius: '10px',
                fontSize: '24px',
                margin: '1px',
                backgroundColor: colorSettings.keyColor,
                color: colorSettings.backgroundColor,
              }}
              width={'100px'}>
              <Flex style={{ marginLeft: '5px' }}>Action</Flex>
            </Flex>
          </Flex>
          <Margin vertical={'5px'} />
          {data.data?.map((d: any, idx: number) => {
            // data iteration
            return (
              <Flex
                horizontal
                key={`AdminTable_datas_idx_${idx}`}
                style={{ border: '1px solid', marginTop: '-1px' }}>
                {Object.entries(props.contents).map(([k, v], __idx) => {
                  // Container iteration
                  return (
                    <Flex
                      flex={v.pref.flex || 1}
                      style={{
                        borderRight: '1px solid',
                        paddingRight: '-1px',
                        margin: '2px',
                      }}
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
                <Flex horizontal center width={'100px'}>
                  {props.patchApi ? (
                    <Button
                      width={'30px'}
                      height={'30px'}
                      variant={'transparent'}
                      style={{ margin: '2px' }}
                      onClick={() => setModifyIdx(idx)}>
                      <Img src={modifyImg} width={'30px'} />
                    </Button>
                  ) : undefined}
                  {props.deleteApi ? (
                    <Button
                      width={'30px'}
                      height={'30px'}
                      variant={'transparent'}
                      style={{ margin: '2px' }}
                      onClick={() => setDeleteIdx(idx)}>
                      <Img src={deleteImg} width={'20px'} />
                    </Button>
                  ) : undefined}
                </Flex>
              </Flex>
            );
          })}
          <Flex center>
            <Button
              onClick={() => {
                if (pageIdx === 0) return;
                setPageIdx(pageIdx - 1);
              }}
              width={'30px'}
              height={'40px'}
              style={{ marginLeft: '2px' }}>
              {'<'}
            </Button>
            {PaginationButton({ data, limit, pageIdx, setPageIdx })}
            <Button
              onClick={() => {
                if (pageIdx === getPaginationCount(data.length, limit) - 1)
                  return;
                setPageIdx(pageIdx + 1);
              }}
              width={'30px'}
              height={'40px'}
              style={{ marginLeft: '2px' }}>
              {'>'}
            </Button>
          </Flex>
        </Color.key>
      </Flex>
      <ReactModal
        isOpen={modifyIdx !== -1}
        onRequestClose={() => {
          setModifyIdx(-1);
        }}
        closeTimeoutMS={200}>
        {modifyIdx === -1
          ? undefined
          : Object.entries(props.contents).map(([key, value]) => {
              return (
                value as {
                  func: (__props: ExclusiveContainerBase<any>) => JSX.Element;
                  pref: Omit<
                    ContainerBase<any>,
                    keyof ExclusiveContainerBase<any>
                  >;
                }
              ).func({
                value: data.data[modifyIdx][key],
                name: key,
                isChanging: true,
                onChange: () => 0,
              });
            })}
      </ReactModal>
      <ReactModal
        isOpen={deleteIdx !== -1}
        onRequestClose={() => {
          setDeleteIdx(-1);
        }}
        closeTimeoutMS={200}>
        <Color.key>Hello, Delete!</Color.key>
      </ReactModal>
    </>
  );
};

export default AdminTable;
