import React from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { initAxiosInterceptors } from './src/helpers/helper'
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import Router from './src/router/Router'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round'
import { EvaIconsPack } from '@ui-kitten/eva-icons';

initAxiosInterceptors()

export default function App() {


  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Router />
        <StatusBar style="auto" />
      </ApplicationProvider>
    </Provider>
  );
}

