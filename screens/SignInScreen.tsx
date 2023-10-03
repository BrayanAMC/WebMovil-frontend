import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useUserStore } from '../stores/useUserStore';

import { useMutation, gql } from '@apollo/client';

const POST_USER= gql`
mutation postUser($email: String!, $password: String!) {
  login(input:{
    name: $email
    email: $password
  })
}`;


const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('diego@gmail.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { accessToken, setAccessToken } = useUserStore();
  
  const [signInMutation] = useMutation(POST_USER);

  const signInRequest = async (email: string, password: string) => {
    setError(false);

    try {
      const response = await signInMutation({
        variables: { email, password },
      });
      console.log(response)
      const accessToken = response.data.login ;
      setAccessToken(accessToken);
      navigation.navigate('Home');
    } catch (e: any) {
      setError(true);
      setErrorMessage(e?.response?.data?.message);
      console.log({ error: e?.response?.data?.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        placeholder="email@email.com"
        value={email}
        inputMode="email"
        onChangeText={(text: string) => setEmail(text)}
      />
      <Text>Password`</Text>
      <TextInput
        placeholder="Password"
        value={password}
        inputMode="text"
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
      />
      <Button title="SignIn" onPress={() => signInRequest(email, password)} />
      {accessToken && <Text>{accessToken}</Text>}
      {error && (
        <Text style={{ color: '#ff0000', fontWeight: '700' }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen;
