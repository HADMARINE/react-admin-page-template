import React from 'react';
import { ContainerBase } from '@components/dataProcessor/index';
import Color from '@components/assets/Color';
import Input from '@components/assets/Input';
import { Text } from '@components/assets/Text';
import { Flex } from '@components/assets/Wrapper';
import { Column } from 'react-rainbow-components';

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
    <Flex
      horizontal
      center={props.center}
      left={props.left}
      right={props.right}
      onClick={props.onClick}
      fitParent
      style={{ margin: '2px' }}>
      <Input
        onChange={props.onChange}
        value={props.value}
        variant={'primary'}
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}
        style={{ border: '1px solid' }}
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
