import React from 'react';
import { ContainerBase } from '@components/dataProcessor/index';
import { Flex } from '@components/assets/Wrapper';
import { Column, Input } from 'react-rainbow-components';

type Props = ContainerBase<string>;

const StringContainer = (props: Props) => {
  return props.isChanging ? (
    <Flex width={'70%'} horizontal flex={1}>
      <Input
        onChange={props.onChange}
        value={props.value}
        variant={'default'}
        style={{ flex: 1 }}
        error={props.error || undefined}
      />
    </Flex>
  ) : (
    <Column
      sortable={props.sortable || true}
      header={props.title}
      field={props.key}
    />
  );
};

export default StringContainer;
