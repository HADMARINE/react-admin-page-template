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
}

const StringContainer = (props: Props) => {
  return (
    <Flex
      flex={props.flex}
      horizontal
      center={props.center}
      left={props.left}
      right={props.right}
      onClick={props.onClick}>
      {props.isChangeState ? (
        <Input value={props.value} onChange={props.onChange} />
      ) : (
        <Color.key>
          <Text>{props.value}</Text>
        </Color.key>
      )}
    </Flex>
  );
};

export default StringContainer;
