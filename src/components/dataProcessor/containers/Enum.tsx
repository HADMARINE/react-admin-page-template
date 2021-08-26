import React from 'react';
import { KeyColor } from '@src/components/assets/Color';
import Dropdown from '@src/components/assets/Dropdown';
import { Text } from '@src/components/assets/Text';
import { Flex } from '@src/components/assets/Wrapper';
import Input from '@components/assets/Input';
import { ContainerBase } from '..';

interface Props extends ContainerBase<string> {
  fontSize?: string;
  fontWeight?: number;
  choices: string[];
}

const EnumContainer = (props: Props) => {
  return (
    <Flex flex={props.flex} horizontal>
      {props.isChanging ? (
        <Dropdown
          value={props.value}
          choices={props.choices}
          onChange={(value: any) => {
            props.onChange({ target: { value: '!' } } as any);
          }}
        />
      ) : (
        // <Input value={props.value} onChange={props.onChange} />
        <KeyColor>
          <Text
            fitParent
            fontSize={props.fontSize}
            fontWeight={props.fontWeight}>
            {props.value}
          </Text>
        </KeyColor>
      )}
    </Flex>
  );
};

export default EnumContainer;
