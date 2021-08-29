import React from 'react';
import { ContainerBase } from '@components/dataProcessor/index';
import { Flex } from '@components/assets/Wrapper';
import { Column, Input } from 'react-rainbow-components';

interface Props extends ContainerBase<string> {
  center?: boolean;
  left?: boolean;
  right?: boolean;
  fontSize?: string;
  fontWeight?: number;
}

const justifyDirection = (
  props: Props,
  action: { center: string; left: string; right: string },
) => {
  if (props.left) return action.left;
  else if (props.right) return action.right;
  else if (props.center) return action.center;
  return '';
};

const StringContainer = (props: Props) => {
  return props.isChanging ? (
    <Flex width={'70%'} horizontal flex={1}>
      <Input
        onChange={props.onChange}
        value={props.value}
        variant={'default'}
        style={{ flex: 1 }}
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
