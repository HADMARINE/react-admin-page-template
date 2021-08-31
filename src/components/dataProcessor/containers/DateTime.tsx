import React from 'react';
import { ColorGen } from '@src/components/assets/Color';
import { Flex } from '@src/components/assets/Wrapper';
import { ContainerBase } from '..';
import { Column, Input } from 'react-rainbow-components';
import moment from 'moment';

type Props = ContainerBase<Date>;

const DateTimeContainer = (props: Props) => {
  return props.isChanging ? (
    <Flex width={'70%'} horizontal flex={1}>
      <Input
        onChange={(e) => {
          e.target.value = moment
            .utc(e.target.value)
            .format('YYYY-MM-DD[T]HH:mm:ss');
          props.onChange(e);
        }}
        value={moment(props.value + '+00:00')
          .local()
          .format('YYYY-MM-DD[T]HH:mm:ss')}
        variant={'default'}
        style={{ flex: 1 }}
        error={props.error || undefined}
        type={'datetime-local'}
      />
    </Flex>
  ) : (
    <Column
      sortable={props.sortable || true}
      header={props.title}
      field={props.key}
      component={(v: any) => (
        <Input
          disabled
          value={moment(v.value + '+00:00')
            .local()
            .format('YYYY-MM-DD[T]HH:mm:ss')}
          type={'datetime'}
        />
      )}
    />
  );
};

export default DateTimeContainer;
