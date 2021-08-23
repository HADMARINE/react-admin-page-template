import React from 'react';
import { Routings } from '@src/store';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

interface Props {
  Routings?: Routings;
}

const Root = (props: Props) => {
  useEffect(() => {
    props.Routings?.push('/main');
    return () => {
      return;
    };
  }, []);
  return <></>;
};

export default inject('Routings')(observer(Root));
