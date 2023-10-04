import { Button, StyleSheet, Text, View } from 'react-native';
import { useUserStore } from '../stores/useUserStore';

const HomeScreen = ({ navigation }: any) => {
  const { accessToken } = useUserStore();
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Text>{accessToken}</Text>
      <Button title="Volver" onPress={() => navigation.navigate('SignIn')} />
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

export default HomeScreen;
