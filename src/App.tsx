import React from 'react';
import './styles/index.scss';

import Router from './Router';
import { Provider } from 'mobx-react';
import store from './store';

const App: React.FC = () => {
  return <Provider {...store}>{Router}</Provider>;
};

export default App;
