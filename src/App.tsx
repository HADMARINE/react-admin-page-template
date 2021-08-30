import React from 'react';
import './styles/index.scss';

import Router from './Router';
import { Provider } from 'mobx-react';
import store from './store';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <Provider {...store}>
      {/* <Toaster
        toastOptions={{
          position: 'top-right',
          duration: 2000,
        }}
      /> */}
      {Router}
    </Provider>
  );
};

export default App;
