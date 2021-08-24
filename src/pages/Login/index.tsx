import React, { useState } from 'react';
import { Text } from '@src/components/assets/Text';
import { Flex, FlexSpacer } from '@src/components/assets/Wrapper';
import Color from '@src/components/assets/Color';
import colorSettings from '@settings/color.json';
import Input from '@src/components/assets/Input';
import Button from '@src/components/assets/Button';
import { Routings } from '@src/store';
import { inject, observer } from 'mobx-react';

interface Props {
  Routings?: Routings;
}

const Login = (props: Props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    props.Routings?.push('/');
    return;
  };

  return (
    <Flex
      vertical
      center
      fit
      style={{ backgroundColor: colorSettings.keyColor }}>
      <Flex vertical center height={'40vh'}>
        <Text fontSize="50px" fontWeight={900}>
          <Color.background>Admin Page</Color.background>
        </Text>

        <FlexSpacer flex={0.4} />

        <Input
          variant={'primary'}
          width={'300px'}
          height={'40px'}
          type={'id'}
          placeholder={'ID'}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <FlexSpacer flex={0.06} />

        <Input
          variant={'primary'}
          width={'300px'}
          height={'40px'}
          type={'password'}
          placeholder={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FlexSpacer flex={0.3} />
        <Button
          onClick={login}
          variant={'primary-inversed'}
          height={'60px'}
          width={'200px'}>
          Sign in
        </Button>
      </Flex>
    </Flex>
  );
};

export default inject('Routings')(observer(Login));
