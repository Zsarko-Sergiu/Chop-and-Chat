import Header from "../components/home/Header";
import MainActions from '../components/home/MainActions';
import FeaturedChef from "../components/home/FeaturedChef";
import { StyleSheet, Platform, View, Button, StatusBar as RNStatusBar } from "react-native";

export default function HomeScreen({ navigation }) { 
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <MainActions /> 
      <FeaturedChef />
      <View style={{ padding: 12 }}>
        <Button title="Open Community Feed" onPress={() => navigation.navigate('Community')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#467A9C',
    paddingTop: Platform.OS === 'ios' ? 35 : (RNStatusBar.currentHeight || 0),
  },
});