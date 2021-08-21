import React from 'react';
import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
  color?: string;
  style?: React.CSSProperties;
}

export default function Divider(props: Props) {
  const DividerGenerator = styled.div`
    background-color: ${props.color || 'white'};
    width: ${props.width || 0};
    height: ${props.height || 0};
  `;
  return <DividerGenerator style={props.style} />;
}
