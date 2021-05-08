import 'react-native-gesture-handler';
import React from 'react';
import Amplify from 'aws-amplify';
import {QueryClient, QueryClientProvider} from 'react-query';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import config from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import {ThemeProvider} from '@shopify/restyle';
import {StatusBar} from 'react-native';
import AdminNavigator from './src/navigation/AdminNavigator';
import AuthenticationNavigator from './src/navigation/Authentication';
import theme from './src/theme';

// Create a client
const queryClient = new QueryClient();

Amplify.configure(config);

const AppStack = createStackNavigator();

//TODO add User navigation stack
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StatusBar />
        <NavigationContainer>
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
            <AppStack.Screen name="AdminScreens" component={AdminNavigator} />
          </AppStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
