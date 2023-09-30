import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'https://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}
