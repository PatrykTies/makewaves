import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import {ThemeProvider} from '@shopify/restyle';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import RootNavigator from './src/Navigation/Root';
import theme from './src/theme';

Amplify.configure(config);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      <RootNavigator />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default withAuthenticator(App);
