import React from 'react';
import styled from 'styled-components';
import Img from '@components/assets/Img';
import DropdownButtonImage from '@assets/dropdown_512.png';
import { Text } from '@components/assets/Text';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import Assets from '@util/Assets';
import colorSettings from '@settings/color.json';

interface Props {
  choices?: string[];
  value?: string;
  onChange?: (value: any) => void;
  name?: string;
  title?: React.ReactNode;
  width?: string;
}

interface DropdownItemProps {
  children?: React.ReactNode;
}

const Wrapper = styled.div`
  height: 40px;
  width: auto;
  color: black;
  border: 1px solid #cacaca;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px 0 5px;
  cursor: pointer;
`;

const DropdownItemWrapper = styled.div`
  color: black;
  width: 100%;
  background-color: white;
  padding: 10px;
  cursor: pointer;
`;

const DropdownMenuWrapper = styled.div`
  padding: 2px 20px 2px 2px;
  margin-top: 5px;
  border: 1px solid #cacaca;
  border-radius: 3px;
  background-color: white;
  width: auto;
  height: auto;
  cursor: pointer;
`;

const Dropdown = (props: Props) => {
  // eslint-disable-next-line react/display-name
  const CustomToggleDropdown = React.forwardRef(
    ({ onClick }: { onClick?: ReactTypes.onClick<any> }, ref: any) => (
      <Wrapper
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          if (onClick) {
            onClick(e);
          }
        }}
        style={{ width: props.width }}>
        <Text style={{ margin: '10px' }}>{props.value}</Text>
        <Img
          style={{ margin: '10px', marginLeft: 0 }}
          width={'14px'}
          src={DropdownButtonImage}
        />
      </Wrapper>
    ),
  );

  const DropdownItem = (itemProps: DropdownItemProps) => {
    return (
      <BootstrapDropdown.Item style={{ zIndex: 10000, textDecoration: 'none' }}>
        <DropdownItemWrapper
          onClick={() =>
            props.onChange !== undefined && props.onChange(itemProps.children)
          }
          style={
            itemProps.children === props.value
              ? { color: colorSettings.keyColor, fontWeight: 700 }
              : undefined
          }>
          {itemProps.children}
        </DropdownItemWrapper>
      </BootstrapDropdown.Item>
    );
  };

  return (
    <div>
      {props.title && (
        <Text
          style={{
            color: colorSettings.keyColor,
            marginBottom: '5px',
            marginLeft: '5px',
          }}
          fontWeight={700}>
          {props.title}
        </Text>
      )}
      <BootstrapDropdown>
        <BootstrapDropdown.Toggle
          as={CustomToggleDropdown}
          id="dropdown-custom-components"
        />
        <BootstrapDropdown.Menu>
          <DropdownMenuWrapper>
            {props.choices?.map((value) => {
              return (
                <DropdownItem
                  key={`Dropdown_${Assets.arbitrary(10000, 99999)}`}>
                  {value}
                </DropdownItem>
              );
            })}
          </DropdownMenuWrapper>
        </BootstrapDropdown.Menu>
      </BootstrapDropdown>
    </div>
  );
};

export default Dropdown;
