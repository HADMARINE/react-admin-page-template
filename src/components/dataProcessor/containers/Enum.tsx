import React from 'react';
import Dropdown from '@src/components/assets/Dropdown';
import { Flex } from '@src/components/assets/Wrapper';
import { ContainerBase } from '..';
import { Badge, Column } from 'react-rainbow-components';
import colorSettings from '@settings/color.json';

interface Props extends ContainerBase<string> {
  fontSize?: string;
  fontWeight?: number;
  choices: string[];
}

const badgeStyles = { color: colorSettings.keyColor, marginLeft: '0.5rem' };
const StatusBadge = ({ value }: any) => (
  <Badge label={value} variant="lightest" style={badgeStyles} />
);

const EnumContainer = (props: Props) => {
  return props.isChanging ? (
    <Flex flex={props.flex} horizontal>
      <Dropdown
        value={props.value}
        choices={props.choices}
        onChange={(value: any) => {
          props.onChange({ target: { value } } as any);
        }}
      />
    </Flex>
  ) : (
    <Column header={props.title} field={props.key} component={StatusBadge} />
  );
};

export default EnumContainer;
