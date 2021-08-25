import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import ExStore from '@store/ExStore';
import ReactModal from 'react-modal';
import { ColorGen } from '@src/components/assets/Color';
import Button from '@src/components/assets/Button';
import StringContainer from '@src/components/dataProcessor/string';
import AdminTable from '@src/components/dataProcessor/AdminTable';
import { __DataTypes } from '@src/components/dataProcessor';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ComponentWrapper = styled.div`
  display: flex;
  width: 70vw;
  height: 200px;
  flex-direction: row;
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
          <ComponentWrapper>
            <StringContainer
              isChanging={this.state.isStringChanging}
              name={'stringValue'}
              value={this.state.stringValue}
              onChange={this.handleChange}
              flex={1}
              title={'str1_title'}
              left
              fontSize={'20px'}
            />
            <StringContainer
              isChanging={this.state.isStringChanging}
              name={'stringValue'}
              value={this.state.stringValue}
              onChange={this.handleChange}
              flex={2}
              title={'str2_title'}
              center
            />
          </ComponentWrapper>
          <Button
            onClick={() =>
              this.setState({ isStringChanging: !this.state.isStringChanging })
            }>
            Change input state
          </Button>

          <AdminTable
            contents={{
              name: __DataTypes.string({ title: 'Name', flex: 1 }),
              email: __DataTypes.string({ title: 'Email', flex: 2 }),
            }}
            getApi={async (props: { skip: number; limit: number }) => {
              return {
                result: true,
                length: 20,
                data: [
                  { name: 'Joe Biden', email: 'biden@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                  { name: 'Donald Trump', email: 'trumpcard@whitehouse.gov' },
                ],
              };
            }}
          />
        </ReactModal>
      </Wrapper>
    );
  }
}