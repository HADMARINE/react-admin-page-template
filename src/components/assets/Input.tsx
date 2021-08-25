import React from 'react';
import styled from 'styled-components';
import { Text } from '@components/assets/Text';
import { ColorGen as Color } from '@components/assets/Color';
import colorSettings from '@settings/color.json';

interface Props {
  variant?: 'primary' | 'plain' | 'error';
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: number;
  onChange?: ReactTypes.onChange;
  onKeyDown?: ReactTypes.onKeyDown;
  value?: ReactTypes.value;
  placeholder?: string;
  blur?: boolean;
  border?: string;
  type?: string;
  object?: React.ReactNode;
  objectAlign?: 'left' | 'right';
  name?: string;
  key?: any;
  flex?: number | string;
  props?: Record<string, any>;
  error?: string;
  style?: React.CSSProperties;
  ref?: any;
}

const theme: Record<string, React.CSSProperties> = {
  plain: { color: 'black', backgroundColor: 'white' },
  primary: {
    color: colorSettings.keyColor,
    backgroundColor: colorSettings.backgroundColor,
  },
  error: {
    color: 'black',
    backgroundColor: '#ffcabf',
    border: '1px solid red',
  },
};

const AbsoluteWrapper = styled.span`
  position: absolute;
  ${(props: Props) =>
    `${props.objectAlign === 'left' ? 'padding-left' : 'padding-right'}: 10px`};
`;

export default function Input(props: Props) {
  const InputStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: props.border || 0,
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: props.fontSize || '14px',
    fontWeight: props.fontWeight || 500,
    padding: props.objectAlign === 'left' ? '0 10px 0 25px' : '0 10px 0 10px',
    margin: 0,
    boxSizing: 'border-box',
    ...theme[props.error ? 'error' : props.variant || 'primary'],
    ...props.style,
  };

  const WrapperStyle: React.CSSProperties = {
    width: props.width || '100%',
    height: props.height || '100%',
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    flex: props.flex,
    justifyContent: props.objectAlign === 'left' ? 'flex-start' : 'flex-end',
    alignItems: 'center',
  };

  return (
    <div
      style={{
        flex: props.flex,
        width: props.width || '100%',
        height: props.height || '100%',
      }}>
      <div style={WrapperStyle}>
        <input
          style={{
            ...InputStyle,
            ...(props.object ? { paddingRight: '20px' } : {}),
          }}
          placeholder={props.placeholder}
          type={props.blur ? 'password' : props.type || 'text'}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          value={props.value}
          name={props.name || ''}
          {...props.props}
        />
        {props.object ? (
          <AbsoluteWrapper objectAlign={props.objectAlign}>
            {props.object}
          </AbsoluteWrapper>
        ) : (
          <></>
        )}
      </div>
      {props.error && (
        <Text style={{ marginLeft: '5px', marginTop: '-10px' }}>
          <Color color={'red'}>{props.error}</Color>
        </Text>
      )}
    </div>
  );
}
