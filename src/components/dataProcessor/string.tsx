import React from 'react';
import { ContainerBase } from '.';
import Color from '../assets/Color';
import Input from '../assets/Input';
import { Text } from '../assets/Text';
import { Flex } from '../assets/Wrapper';

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
  return (
    <Flex
      flex={props.flex}
      horizontal
      center={props.center}
      left={props.left}
      right={props.right}
      onClick={props.onClick}
      style={{ width: '100%', height: '100%', margin: '2px' }}>
      {props.isChanging ? (
        <Input
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          variant={'primary'}
          fontSize={props.fontSize}
          fontWeight={props.fontWeight}
        />
      ) : (
        <Color.key>
          <Text
            width={'100%'}
            height={'100%'}
            fontSize={props.fontSize}
            fontWeight={props.fontWeight}
            textAlign={justifyDirection(props, {
              center: 'center',
              left: 'left',
              right: 'right',
            })}>
            {props.value}
          </Text>
        </Color.key>
      )}
    </Flex>
  );
};

export default StringContainer;
