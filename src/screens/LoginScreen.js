import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($name: String!, $email: String!, $password: String!) {
    login(input: { name: $name, email: $email, password: $password }) {
      token
    }
  }
`;

const LoginScreen = () => {
  const [name, setName] = useState(''); // Agregar campo de nombre
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { name, email, password } });
      const token = data.login.token;

      // Guardar el token en el almacenamiento local o en el contexto de la aplicación
      // Redirigir a la pantalla principal u otra pantalla después del inicio de sesión
    } catch (error) {
      Alert.alert('Error', 'La autenticación ha fallado. Verifica tus credenciales.');
    }
  };

  return (
    <View>
      <Text>Iniciar Sesión</Text>
      <TextInput
        placeholder="Nombre" // Cambiar a nombre
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} disabled={loading} />
      {loading && <Text>Cargando...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

export default LoginScreen;
