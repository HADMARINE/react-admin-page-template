import React, { useEffect, useState } from 'react';
import { AdminTableGetApi, ContainerBase, ExclusiveContainerBase } from '.';
import Color from '../assets/Color';
import { Flex, FlexSpacer } from '../assets/Wrapper';
import colorSettings from '@settings/color.json';
import Button from '../assets/Button';
import { Margin } from '../assets/Format';
import Img from '../assets/Img';
import deleteImg from '@src/assets/delete_512.png';
import modifyImg from '@src/assets/modify_200.png';
import ReactModal from 'react-modal';
import { Text } from '../assets/Text';
import Dropdown from '../assets/Dropdown';
import { ButtonMenu, Column, MenuItem, Table } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

interface Props<T extends Record<string, ContainerBase<any>>> {
  contents: T;
  getApi: AdminTableGetApi<
    { [P in keyof T]: T[P] extends ContainerBase<infer U> ? U : any }
  >;
  patchApi?: (data: {
    data: Record<string, any>;
    docId: string;
  }) => Promise<{ result: boolean }>;
  deleteApi?: (data: { docId: string }) => Promise<{ result: boolean }>;
}

const getPaginationCount = (length: number, limit: number) => {
  return Math.floor(length / limit) + (length % limit === 0 ? 0 : 1) || 1;
};

const PaginationButton = (props: {
  data: any;
  limit: number;
  pageIdx: number;
  setPageIdx: (arg0: number) => void;
  isLoading: boolean;
}): JSX.Element[] => {
  const arr = [];

  const _limit = 9; // odd number recommended
  const paginationCount = getPaginationCount(props.data?.length, props.limit);
  const limit = _limit > paginationCount ? paginationCount : _limit;
  const start =
    paginationCount > limit
      ? limit - props.pageIdx - 1 < Math.floor(limit / 2)
        ? props.pageIdx - Math.floor(limit / 2) + limit <= paginationCount
          ? props.pageIdx - Math.floor(limit / 2)
          : paginationCount - limit
        : 0
      : 0;

  if (props.isLoading) {
    for (let i = 0; i < _limit; i++) {
      arr.push(
        <Button
          width={'30px'}
          height={'40px'}
          style={{
            marginLeft: '2px',
            border: `1px solid ${colorSettings.keyColor}`,
          }}
          variant={'primary-inversed'}
          onClick={() => undefined}>
          ·
        </Button>,
      );
    }
    return arr;
  }

  for (let i = start; i < limit + start; i++) {
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

// const AdditionalMenu = ({ value, name }) => {
//   return (
//     <>
//       <MenuItem label="Delete" onClick={() => console.log(`Delete ${name}`)} />
//       <MenuItem label="Edit" onClick={() => console.log(`Edit ${name}`)} />
//     </>
//   );
// };

const limitHistory = [0, 0];

const AdminTable = function <T extends Record<string, any>>(props: Props<T>) {
  type ApiType = ThenArgRecursive<
    ReturnType<AdminTableGetApi<Record<string, any>>>
  >;

  const [data, setData] = useState<ApiType>();
  const [sortMethods, setSortMethods] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [pageIdx, setPageIdx] = useState(0);
  const [limit, setLimit] = useState(10);

  const [modifyIdx, setModifyIdx] = useState(-1);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [modalFormData, setModalFormData] = useState<Record<string, any>>({});

  const [sort, setSort] = useState('');

  const AdditionalMenu = (_props: any) => {
    const { index } = _props;
    return (
      <ButtonMenu
        id="additional-menu"
        menuAlignment="right"
        menuSize="x-small"
        icon={<FontAwesomeIcon icon={faEllipsisV} />}
        buttonVariant="base"
        className="rainbow-m-left_xx-small">
        <MenuItem label="Delete" onClick={() => setDeleteIdx(index)} />
        <MenuItem label="Edit" onClick={() => setModifyIdx(index)} />
      </ButtonMenu>
    );
  };

  useEffect(() => {
    if (sortMethods !== data?.sortMethod && data?.sortMethod) {
      setSortMethods(data?.sortMethod);
      if (!sort) {
        setSort(sortMethods[0]);
      }
    }
    return () => {
      return;
    };
  }, [data]);

  async function apiRequest() {
    setIsLoading(true);
    setData(undefined);
    setData(await props.getApi({ skip: pageIdx * limit, limit }));
    setIsLoading(false);
  }

  useEffect(() => {
    // check modifyIdx and deleteIdx are -1
    if (modifyIdx * deleteIdx !== 1) {
      return;
    }

    apiRequest();
    return () => {
      return;
    };
  }, [modifyIdx, deleteIdx]);

  useEffect(() => {
    apiRequest();
    return () => {
      return;
    };
  }, [pageIdx]);

  useEffect(() => {
    limitHistory[1] = limitHistory[0];
    limitHistory[0] = limit;

    setPageIdx(Math.floor((pageIdx * limitHistory[1]) / limit));

    apiRequest();
    return () => {
      return;
    };
  }, [limit]);

  useEffect(() => {
    setPageIdx(0);
    return () => {
      return;
    };
  }, [sort]);

  return (
    <>
      <Flex vertical>
        <Flex width={'100%'} right style={{ alignItems: 'flex-end' }}>
          <Dropdown
            title={'Row per page'}
            choices={[
              '1',
              '5',
              '10',
              '20',
              '30',
              '40',
              '50',
              '60',
              '70',
              '80',
              '90',
              '100',
            ]}
            onChange={(value: string) => setLimit(parseInt(value, 10))}
            value={limit.toString()}
          />
          <Margin horizontal={'20px'} />
          <Dropdown
            title={'Sort'}
            choices={data?.sortMethod}
            value={sort}
            onChange={(value: string) => setSort(value)}
            width={'100px'}
          />
          <Margin horizontal={'10px'} />
          <Button
            onClick={() => {
              setPageIdx(0);
              apiRequest();
            }}
            width={'40px'}
            height={'40px'}
            style={{ marginBottom: '2px' }}
            variant={'transparent'}>
            <FontAwesomeIcon icon={faSyncAlt} color={'black'} />
          </Button>
          <Margin horizontal={'10px'} />
        </Flex>
        <Margin vertical={'10px'} />

        <Color.key>
          <Flex horizontal>
            <Table keyField="_id" data={data?.data} isLoading={isLoading}>
              {Object.entries(props.contents).map(([k, v]) => {
                return (
                  v as {
                    func: (__props: ExclusiveContainerBase<any>) => JSX.Element;
                    pref: Omit<
                      ContainerBase<any>,
                      keyof ExclusiveContainerBase<any>
                    >;
                  }
                ).func({
                  isChanging: false,
                  onChange: (e: any) => {
                    setModalFormData({ ...modalFormData, [k]: e.target.value });
                  },
                  key: k,
                });
              })}
              <Column field={'status'} component={AdditionalMenu} width={60} />
            </Table>
          </Flex>
          <Margin vertical={'10px'} />
          <Flex center>
            {/* Pagination Button */}
            <Button
              onClick={() => {
                if (pageIdx === 0) return;
                setPageIdx(pageIdx - 1);
              }}
              width={'30px'}
              height={'40px'}
              style={{ marginLeft: '2px' }}>
              {pageIdx === 0 ? '·' : '❮'}
            </Button>
            {PaginationButton({ data, limit, pageIdx, setPageIdx, isLoading })}
            <Button
              onClick={() => {
                if (
                  pageIdx ===
                  getPaginationCount(data?.length || 0, limit) - 1
                )
                  return;
                setPageIdx(pageIdx + 1);
              }}
              width={'30px'}
              height={'40px'}
              style={{ marginLeft: '2px' }}>
              {pageIdx === getPaginationCount(data?.length || 0, limit) - 1
                ? '·'
                : '❯'}
            </Button>
          </Flex>
        </Color.key>
      </Flex>
      <ReactModal
        isOpen={modifyIdx !== -1}
        onRequestClose={() => {
          setModifyIdx(-1);
        }}
        onAfterOpen={() => {
          const modifyFormStack: Record<string, any> = {};
          Object.entries(data?.data?.[modifyIdx] || {}).forEach(
            ([key, value]) => {
              modifyFormStack[key] = value;
            },
          );
          setModalFormData(modifyFormStack);
        }}
        closeTimeoutMS={200}
        ariaHideApp={false}>
        <Flex vertical fitParent>
          <Flex vertical flex={9} width={'100%'}>
            <Text fontSize="24px">
              <Color.key>Modification</Color.key>
            </Text>
            <Margin vertical={'50px'} />
            {Object.entries(modalFormData).map(([key, value]) => {
              if (!props.contents[key]) return;
              return (
                <Flex
                  horizontal
                  key={`AdminTable_reactmodal_iter_${key}`}
                  width={'100%'}
                  style={{ marginTop: '20px' }}>
                  <FlexSpacer flex={1} />
                  <Flex width={'100px'}>
                    <Color.key>{props.contents[key]?.pref?.title}</Color.key>
                  </Flex>
                  <Flex flex={2}>
                    {props.contents[key].func({
                      value,
                      name: key,
                      isChanging: true,
                      onChange: (e: any) => {
                        setModalFormData({
                          ...modalFormData,
                          [key]: e.target.value,
                        });
                      },
                    })}
                  </Flex>
                  <FlexSpacer flex={1} />
                </Flex>
              );
            })}
          </Flex>
          <FlexSpacer flex={1} />
          <Button
            onClick={() => {
              const dat: Record<string, any> = {};

              const whitelistKeys = Object.keys(props.contents);
              Object.entries(modalFormData).forEach(([k, v]) => {
                if (whitelistKeys.indexOf(k) !== -1) {
                  dat[k] = v;
                }
              });
              // eslint-disable-next-line no-unused-expressions
              props.patchApi &&
                props
                  .patchApi({ data: dat, docId: modalFormData._id })
                  .then(() => {
                    setModifyIdx(-1);
                  });
            }}>
            Save
          </Button>
          <FlexSpacer flex={0.5} />
        </Flex>
      </ReactModal>
      <ReactModal
        isOpen={deleteIdx !== -1}
        onRequestClose={() => {
          setDeleteIdx(-1);
        }}
        onAfterOpen={() => {
          const modifyFormStack: Record<string, any> = {};
          Object.entries(data?.data?.[deleteIdx] || {}).forEach(
            ([key, value]) => {
              modifyFormStack[key] = value;
            },
          );
          setModalFormData(modifyFormStack);
        }}
        closeTimeoutMS={200}
        ariaHideApp={false}>
        <Flex vertical center fitParent>
          <Flex vertical flex={9} width={'100%'}>
            <Text fontSize="24px">
              <Color.key>Deletion</Color.key>
            </Text>
            <Margin vertical={'50px'} />
            {deleteIdx !== -1 && (
              <Table
                keyField={'_id'}
                data={data?.data && [data?.data[deleteIdx]]}>
                {Object.entries(modalFormData).map(([key, value]) => {
                  if (!props.contents[key]) return;

                  const column = props.contents[key].func({
                    value,
                    name: key,
                    isChanging: false,
                    key,
                  });

                  return column;
                })}
              </Table>
            )}
          </Flex>
          <FlexSpacer flex={1} />
          <Button
            onClick={() => {
              const dat: Record<string, any> = {};

              const whitelistKeys = Object.keys(props.contents);
              Object.entries(modalFormData).forEach(([k, v]) => {
                if (whitelistKeys.indexOf(k) !== -1) {
                  dat[k] = v;
                }
              });
              // eslint-disable-next-line no-unused-expressions
              props.deleteApi &&
                props
                  .deleteApi({ docId: data?.data?.[deleteIdx]._id })
                  .then(() => {
                    setDeleteIdx(-1);
                  });
            }}>
            Delete
          </Button>
          <FlexSpacer flex={0.5} />
        </Flex>
      </ReactModal>
    </>
  );
};

export default AdminTable;
