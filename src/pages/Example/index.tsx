import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import ExStore from '@store/ExStore';
import ReactModal from 'react-modal';
import { ColorGen } from '@src/components/assets/Color';
import Button from '@src/components/assets/Button';

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
  state = {
    isModalOpen: true,
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
        </ReactModal>
      </Wrapper>
    );
  }
}
