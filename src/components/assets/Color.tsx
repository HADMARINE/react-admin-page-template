import React from 'react';
import styled from 'styled-components';
import colorSettings from '@settings/color.json';

export const KeyColor = styled.span`
  color: ${colorSettings.keyColor};
`;

export const BackgroundColor = styled.span`
  color: ${colorSettings.backgroundColor};
`;

interface ColorProps {
  color?: string;
  children?: React.ReactNode;
}

const ColorComponent = styled.span``;

export const ColorGen = (props: ColorProps) => {
  return (
    <ColorComponent style={{ color: props.color }}>
      {props.children}
    </ColorComponent>
  );
};

export default {
  key: KeyColor,
  background: BackgroundColor,
  gen: ColorGen,
};
