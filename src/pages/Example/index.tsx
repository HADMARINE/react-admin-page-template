import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import ExStore from '@store/ExStore';
import ReactModal from 'react-modal';
import { ColorGen } from '@src/components/assets/Color';
import Button from '@src/components/assets/Button';
import StringContainer from '@src/components/dataProcessor/string';

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
              isChangeState={this.state.isStringChanging}
              name={'stringValue'}
              value={this.state.stringValue}
              onChange={this.handleChange}
              flex={1}
              left
              fontSize={'20px'}
            />
            <StringContainer
              isChangeState={this.state.isStringChanging}
              name={'stringValue'}
              value={this.state.stringValue}
              onChange={this.handleChange}
              flex={2}
              center
            />
          </ComponentWrapper>
          <Button
            onClick={() =>
              this.setState({ isStringChanging: !this.state.isStringChanging })
            }>
            Change input state
          </Button>
        </ReactModal>
      </Wrapper>
    );
  }
}
