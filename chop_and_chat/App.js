import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import Header from "./components/home/Header";
import MainActions from './components/home/MainActions';
import FeaturedChef from "./components/home/FeaturedChef";
import CommunityFeed from "./components/home/CommunityFeed"; 

export default function App() { 
  return (
    <View style={styles.container}>
      <Header />
      <MainActions /> 
      <FeaturedChef />
      <CommunityFeed />
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
