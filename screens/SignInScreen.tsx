import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ENDPOINT_MS_USER } from 'react-native-dotenv';
import { useUserStore } from '../stores/useUserStore';

const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('diego.ramirez@ce.ucn.cl');
  const [password, setPassword] = useState('12345');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { accessToken, setAccessToken } = useUserStore();

  const signInRequest = async (email: string, password: string) => {
    setError(false);

    try {
      const response = await axios.post(`${ENDPOINT_MS_USER}/sign-in`, {
        email,
        password,
      });

      const accessToken = response?.data?.accessToken || '';
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
        placeholder="email@email.cl"
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
