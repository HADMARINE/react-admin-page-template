import React from 'react';
import styled from 'styled-components';
import colorSettings from '@settings/color.json';

interface Props {
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: number;
  onClick?: ReactTypes.onClick<HTMLButtonElement>;
  props?: Record<string, any>;
  variant?:
    | 'primary'
    | 'primary-inversed'
    | 'secondary'
    | 'gray'
    | 'violet'
    | 'transparent'
    | 'black';
  color?: string;
  flex?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  raw?: boolean;
  disabled?: boolean;
  href?: string;
}

const theme = {
  primary: `color:${colorSettings.backgroundColor} ; background-color: ${colorSettings.keyColor};`,
  'primary-inversed': `color:${colorSettings.keyColor} ; background-color: ${colorSettings.backgroundColor};`,
  secondary: 'color: gray; background-color: white;',
  gray: 'color: white; background-color: #363636;',
  violet: 'color:white; background-color: #520092;',
  black: 'color:white; background-color:black',
  transparent: 'background: none; color: white;',
  disabled: 'background:gray; color: white; cursor: not-allowed;',
};

export default function Button(props: Props) {
  const ButtonGenerator = styled.button`
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    ${props.raw
      ? ''
      : `width: ${props.width || '400px'};
    height: ${props.height || '70px'};
    font-size: ${props.fontSize || '20px'};
    font-weight: ${props.fontWeight || 500};
    ${theme[props.disabled ? 'disabled' : props.variant || 'primary']}`};
    border-radius: 3px;
    padding: 0;
    margin: 5px 0;
    flex: ${props.flex || ''};
    ${props.color ? `color: ${props.color}` : ``};
    border: none;
  `;
  return (
    <ButtonGenerator
      {...props.props}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </ButtonGenerator>
  );
}
