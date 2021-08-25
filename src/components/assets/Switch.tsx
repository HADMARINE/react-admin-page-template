import React from 'react';
import colorSettings from '@settings/color.json';

interface Props {
  value?: boolean;
  onClick?: ReactTypes.onClick<HTMLInputElement>;
  themeColor?: string;
  disabledColor?: string;
  buttonColor?: string;
  duration?: number;
}

const Switch = (props: Props) => {
  const WrapperStyle: React.CSSProperties = {
    transition: `all ${props.duration || 0.3}s ease-in-out`,
    backgroundColor: props.value
      ? props.themeColor || colorSettings.keyColor //TODO : change color: ;
      : props.disabledColor || 'gray',
    width: '50px',
    height: '30px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const SwitchObject: React.CSSProperties = {
    transition: `all ${props.duration || 0.3}s ease-in-out`,
    height: '26px',
    width: '26px',
    backgroundColor: props.buttonColor || 'white',
    borderRadius: '30px',
    margin: '2px',
    marginLeft: props.value ? '22px' : '2px',
  };

  return (
    <div style={WrapperStyle} onClick={props.onClick}>
      <div style={SwitchObject} />
    </div>
  );
};

export default Switch;
