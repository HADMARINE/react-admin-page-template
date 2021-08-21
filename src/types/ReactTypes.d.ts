import React from 'react';

declare global {
  namespace ReactTypes {
    type onClick<T> = (event: React.MouseEvent<T, MouseEvent>) => void;

    type onChange = (event: onChangeEvent) => void;

    type onMouseEnter = (event: React.MouseEvent<any, MouseEvent>) => void;

    type onMouseLeave = (event: React.MouseEvent<any, MouseEvent>) => void;

    type onKeyDown = (event: keyboardEvent) => void;

    type onChangeEvent = React.ChangeEvent<HTMLInputElement>;

    type keyboardEvent = React.KeyboardEvent<HTMLInputElement>;

    type value = string | number | string[];
  }
}
