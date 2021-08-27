import { ColorGen, KeyColor } from '@src/components/assets/Color';
import { Flex } from '@src/components/assets/Wrapper';
import React from 'react';
import DateTime from 'react-datetime-picker';

interface Props {
  key?: string;
  value?: Date;
  onChange?: any;
}

const DateTimeContainer = (props: Props) => {
  return (
    <Flex>
      <ColorGen color={'black'}>
        <DateTime
          value={props.value}
          onChange={props.onChange}
          format={'yyyy-MM-dd hh:mm:ss'}
        />
      </ColorGen>
    </Flex>
  );
};

export default DateTimeContainer;
