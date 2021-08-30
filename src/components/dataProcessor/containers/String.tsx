import React, { useEffect } from 'react';
import { ContainerBase } from '@components/dataProcessor/index';
import { Flex } from '@components/assets/Wrapper';
import { Column, Input } from 'react-rainbow-components';

interface Props extends ContainerBase<string> {
  fontSize?: string;
  fontWeight?: number;
  verifier?: (value: any) => string | null;
}

const StringContainer = (props: Props) => {
  const verify = () => {
    if (!props.verifier) {
      return;
    }
    const e = props.verifier(props.value);
    if (e) {
      props.setError(e);
    }
  };

  return props.isChanging ? (
    <Flex width={'70%'} horizontal flex={1}>
      <Input
        onChange={(e) => {
          props.onChange(e);
          verify();
        }}
        value={props.value}
        variant={'default'}
        style={{ flex: 1 }}
        error={props.error || undefined}
      />
    </Flex>
  ) : (
    <Column
      sortable={props.sortable || true}
      header={props.title}
      field={props.key}
    />
  );
};

export default StringContainer;
