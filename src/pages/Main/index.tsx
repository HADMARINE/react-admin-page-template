import React from 'react';
import { Flex } from '@src/components/assets/Wrapper';
import { Routings } from '@src/store';
import { inject, observer } from 'mobx-react';
import colorSettings from '@settings/color.json';

interface Props {
  Routings?: Routings;
}

const Main = (props: Props) => {
  return (
    <Flex
      vertical
      center
      fit
      style={{
        backgroundColor: colorSettings.backgroundColor,
        color: colorSettings.keyColor,
      }}></Flex>
  );
};

export default inject('Routings')(observer(Main));
