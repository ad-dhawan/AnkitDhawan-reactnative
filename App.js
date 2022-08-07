import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './src/navigators/AppNavigation';
import {persistor, store} from './src/redux/store';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
