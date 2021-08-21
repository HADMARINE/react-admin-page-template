import React from 'react';
import { Text } from '@src/components/assets/Text';
import { Flex } from '@src/components/assets/Wrapper';
import Color from '@src/components/assets/Color';
import styled from 'styled-components';
import colorSettings from '@settings/color.json';
import Input from '@components/assets/Input';

const Login = () => (
  <Flex vertical fit style={{ backgroundColor: colorSettings.keyColor }}>
    <Text fontSize="50px" fontWeight={900}>
      <Color.background>Login</Color.background>
    </Text>

    <Input />
  </Flex>
);

export default Login;
