import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import Header from "./components/home/Header"
import MainActions from './components/home/MainActions';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <MainActions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight,
  },
});
