import React from 'react';
import styled from 'styled-components';

interface InputProps extends ReactCustomElementProps {
  hello?: string;
}

export const InputGen = (props: InputProps) => {
  // eslint-disable-next-line no-underscore-dangle
  const _Input = styled.input``;

  return <_Input>{props.children}</_Input>;
};

export default { gen: InputGen };
