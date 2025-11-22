import Header from "../components/home/Header";
import MainActions from '../components/home/MainActions';
import FeaturedChef from "../components/home/FeaturedChef";
import CommunityFeed from "../components/home/CommunityFeed"; 
import { StyleSheet, Platform, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

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
    backgroundColor: '#467A9C',
    paddingTop: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight,
  },
});
