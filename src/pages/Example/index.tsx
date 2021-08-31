import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import ExStore from '@store/ExStore';
import ReactModal from 'react-modal';
import { ColorGen } from '@src/components/assets/Color';
import Button from '@src/components/assets/Button';
import AdminTable from '@src/components/dataProcessor/AdminTable';
import { __DataTypes } from '@src/components/dataProcessor';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface Props {
  ExStore: ExStore;
}

@inject('ExStore')
@observer
export default class Index extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  state = {
    isModalOpen: true,
    isStringChanging: true,
    stringValue: 'Hello world',
    date: new Date(),
  };

  handleChange = (e: ReactTypes.onChangeEvent) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Wrapper>
        {this.props.ExStore.value}
        <button onClick={() => this.props.ExStore.toggleValue()}>
          Hello/World
        </button>
        <ReactModal
          isOpen={this.state.isModalOpen}
          onRequestClose={() => {
            this.setState({ isModalOpen: false });
          }}
          closeTimeoutMS={200}>
          <ColorGen color="#ea5550">Hello world</ColorGen>
          <Button onClick={() => this.setState({ isModalOpen: false })}>
            Close
          </Button>
          <Button
            onClick={() =>
              this.setState({ isStringChanging: !this.state.isStringChanging })
            }>
            Change input state
          </Button>

          <AdminTable
            contents={{
              name: __DataTypes.string({ title: 'Name' }),
              email: __DataTypes.string({
                title: 'Email',
                verifier: (value) => {
                  if (value !== 'biden@whitehouse.gov') {
                    return 'Error, biden is the president';
                  }
                },
              }),
              enum: __DataTypes.enum({
                title: 'Enum',
                choices: ['a', 'b'],
              }),
              date: __DataTypes.dateTime({ title: 'Date' }),
            }}
            getApi={async (_props: { skip: number; limit: number }) => {
              await new Promise((resolve: any) => setTimeout(resolve, 500));
              return {
                result: true,
                length: 20,
                data: [
                  {
                    _id: '1',
                    name: 'Joe Biden',
                    email: 'biden@whitehouse.gov',
                    enum: 'a',
                    date: moment(Date.now()).format('YYYY-MM-DD[T]HH:mm:ss'),
                  },
                  {
                    _id: '2',
                    name: 'Donald Trump',
                    email: 'trumpcard@whitehouse.gov',
                    enum: 'a',
                    date: moment
                      .utc(Date.now())
                      .format('YYYY-MM-DD[T]HH:mm:ss'),
                  },
                ],
              };
            }}
            patchApi={async (v: any) => {
              console.log('NAN NAN NUU', v);
              return { result: true };
            }}
            deleteApi={async () => ({
              result: true,
            })}
            title={'Hello world'}
          />
        </ReactModal>
      </Wrapper>
    );
  }
}
