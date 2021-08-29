import React, { useEffect, useState } from 'react';
import { AdminTableGetApi, ContainerBase, ExclusiveContainerBase } from '.';
import Color, { KeyColor } from '../assets/Color';
import { Flex, FlexSpacer } from '../assets/Wrapper';
import colorSettings from '@settings/color.json';
import { Margin } from '../assets/Format';
import Img from '../assets/Img';
import deleteImg from '@src/assets/delete_512.png';
import modifyImg from '@src/assets/modify_200.png';
import ReactModal from 'react-modal';
import { Text } from '../assets/Text';
import {
  Button,
  ButtonMenu,
  Column,
  Input,
  MenuItem,
  Option,
  Pagination,
  Picklist,
  Table,
} from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faSyncAlt,
  faSearch,
  faPlus,
  faTimes,
  faSearchMinus,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

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
  title?: string;
}

const getPaginationCount = (length: number, limit: number) => {
  return Math.ceil(length / limit); // Math.floor(length / limit) + (length % limit === 0 ? 0 : 1) || 1;
};

// const PaginationButton = (props: {
//   data: any;
//   limit: number;
//   pageIdx: number;
//   setPageIdx: (arg0: number) => void;
//   isLoading: boolean;
// }): JSX.Element[] => {
//   const arr = [];

//   const _limit = 9; // odd number recommended
//   const paginationCount = getPaginationCount(props.data?.length, props.limit);
//   const limit = _limit > paginationCount ? paginationCount : _limit;
//   const start =
//     paginationCount > limit
//       ? limit - props.pageIdx - 1 < Math.floor(limit / 2)
//         ? props.pageIdx - Math.floor(limit / 2) + limit <= paginationCount
//           ? props.pageIdx - Math.floor(limit / 2)
//           : paginationCount - limit
//         : 0
//       : 0;

//   if (props.isLoading) {
//     for (let i = 0; i < _limit; i++) {
//       arr.push(
//         <Button
//           width={'30px'}
//           height={'40px'}
//           style={{
//             marginLeft: '2px',
//             border: `1px solid ${colorSettings.keyColor}`,
//           }}
//           variant={'primary-inversed'}
//           onClick={() => undefined}>
//           ·
//         </Button>,
//       );
//     }
//     return arr;
//   }

//   for (let i = start; i < limit + start; i++) {
//     arr.push(
//       <Button
//         width={'30px'}
//         height={'40px'}
//         style={{
//           marginLeft: '2px',
//           border: `1px solid ${colorSettings.keyColor}`,
//         }}
//         variant={props.pageIdx === i ? 'primary-inversed' : 'primary'}
//         onClick={() => props.setPageIdx(i)}>
//         {i + 1}
//       </Button>,
//     );
//   }

//   return arr;
// };

const limitHistory = [0, 0];

const AdminTable = function <T extends Record<string, any>>(props: Props<T>) {
  type ApiType = ThenArgRecursive<
    ReturnType<AdminTableGetApi<Record<string, any>>>
  >;

  const [data, setData] = useState<ApiType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryTabOpen, setIsQueryTabOpen] = useState(false);

  const [pageIdx, setPageIdx] = useState(0);
  const [limit, setLimit] = useState(10);

  const [modifyIdx, setModifyIdx] = useState(-1);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [modalFormData, setModalFormData] = useState<Record<string, any>>({});

  const [sort, setSort] = useState<
    { target: string; direction: 'asc' | 'desc' } | undefined
  >(undefined);
  const [query, setQuery] = useState<Record<string, string | undefined>>({
    name: undefined,
  });

  const getVacantKey = (
    _query: Record<string, any>,
    contents: Record<string, any>,
  ): string | null => {
    const queryKeys = Object.keys(_query);
    for (const key of Object.keys(contents)) {
      if (queryKeys.indexOf(key) === -1) {
        return key as string;
      }
    }
    return null;
  };

  const [vacantKey, setVacantKey] = useState(
    getVacantKey(query, props.contents),
  );

  useEffect(() => {
    setVacantKey(getVacantKey(query, props.contents));
    return () => {
      return;
    };
  }, [query]);

  useEffect(() => {
    return () => {
      return;
    };
  }, [data]);

  async function apiRequest() {
    // debounce here
    setIsLoading(true);
    setData(undefined);
    const getApiProps: Parameters<AdminTableGetApi<any>>[0] = {
      skip: pageIdx * limit,
      limit,
      order: sort,
    };
    if (isQueryTabOpen) {
      const finalQuery: Record<string, any> = {};
      for (const __ of Object.entries(query)) {
        const [__k, __v] = __;
        if (__v) {
          finalQuery[__k] = __v;
        }
      }
      getApiProps.query = finalQuery;
    }
    setData(await props.getApi(getApiProps));
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
  }, [pageIdx, sort?.target, sort?.direction, query]);

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

  const handleSort = (e: any, field: string, direction: string) => {
    setSort({ target: field, direction: direction as 'asc' | 'desc' });
  };

  return (
    <>
      <Flex vertical>
        <Flex horizontal width={'100%'}>
          <Flex flex={1} left>
            <KeyColor>
              <Text fontSize={'24px'} fontWeight={900}>
                {props.title}
              </Text>
            </KeyColor>
          </Flex>
          <Flex right style={{ alignItems: 'flex-end' }}>
            <Picklist
              onChange={(value) =>
                setLimit(
                  parseInt((value?.name as string | undefined) || '10', 10),
                )
              }
              style={{ width: '100px' }}
              value={{ name: limit.toString(), label: limit.toString() }}
              label={'Row per page'}>
              {[
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
              ].map((v) => (
                <Option key={`PickListOption_${v}`} name={v} label={v} />
              ))}
            </Picklist>
            <Margin horizontal={'20px'} />
            <Button
              variant={'base'}
              style={{ marginBottom: '2px', width: '40px', height: '40px' }}
              onClick={() => setIsQueryTabOpen(!isQueryTabOpen)}>
              <FontAwesomeIcon
                icon={!isQueryTabOpen ? faSearch : faSearchMinus}
                color={colorSettings.keyColor}
              />
            </Button>
            <Margin horizontal={'20px'} />
            <Button
              onClick={() => {
                setPageIdx(0);
                apiRequest();
              }}
              style={{ marginBottom: '2px', width: '40px', height: '40px' }}
              variant={'base'}>
              <FontAwesomeIcon
                icon={faSyncAlt}
                color={colorSettings.keyColor}
              />
            </Button>
            <Margin horizontal={'10px'} />
          </Flex>
        </Flex>
        <Margin vertical={'10px'} />
        {isQueryTabOpen && (
          <Flex
            width={'100%'}
            style={{
              border: '1px solid gray',
              borderRadius: '5px',
              padding: '20px 5px 20px 5px',
            }}
            vertical>
            <Flex width={'100%'} left>
              <KeyColor
                style={{
                  fontSize: '20px',
                  marginLeft: '10px',
                  fontWeight: 500,
                }}>
                Precise Search
              </KeyColor>
            </Flex>
            <Margin vertical={'20px'} />
            {Object.entries(query).map(([_k, _v]) => (
              <Flex width={'100%'} horizontal key={`AdminTable_search_${_k}`}>
                <Picklist
                  onChange={(value) => {
                    setQuery({
                      ..._.omit(query, [_k]),
                      [value.name as string]: undefined,
                    });
                  }}
                  style={{ flex: 1, margin: '10px' }}
                  value={{
                    name: _k,
                    label: `${_k[0].toUpperCase()}${_k.slice(1)}`,
                  }}>
                  {Object.keys(props.contents).map((v) => {
                    if (Object.keys(query).indexOf(v) !== -1) return;
                    return (
                      <Option
                        key={`PickListOption_search_${v}`}
                        name={v}
                        label={`${[v[0].toUpperCase()]}${v.slice(1)}`}
                      />
                    );
                  })}
                </Picklist>
                <Input
                  style={{ flex: 2 }}
                  onChange={(e) => {
                    setQuery({ ...query, [_k]: e.target.value });
                  }}
                  value={query[_k]}
                />
                <Button
                  variant={'neutral'}
                  style={{ width: '40px', height: '40px', margin: '10px' }}
                  onClick={() => {
                    setQuery({ ..._.omit(query, [_k]) });
                  }}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    color={colorSettings.keyColor}
                  />
                </Button>
              </Flex>
            ))}
            {vacantKey && (
              <Flex width={'100%'} horizontal center>
                {/* <FlexSpacer flex={1} /> */}
                <Button
                  variant={'border'}
                  onClick={() => {
                    setQuery({
                      ...query,
                      [vacantKey]: undefined,
                    });
                    setVacantKey(getVacantKey(query, props.contents));
                  }}>
                  <KeyColor>
                    <FontAwesomeIcon
                      icon={faPlus}
                      color={colorSettings.keyColor}
                    />
                  </KeyColor>
                </Button>
                {/* <FlexSpacer flex={3.5} /> */}
              </Flex>
            )}
          </Flex>
        )}
        <Margin vertical={'10px'} />
        <Color.key>
          <Flex horizontal>
            <Table
              keyField="_id"
              data={data?.data}
              isLoading={isLoading}
              onSort={handleSort}
              sortDirection={sort?.direction}
              sortedBy={sort?.target}>
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
          <Pagination
            pages={getPaginationCount(data?.length || 0, limit)}
            onChange={(e, page) => setPageIdx(page - 1)}
            activePage={pageIdx + 1}
            variant={'shaded'}
          />
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
