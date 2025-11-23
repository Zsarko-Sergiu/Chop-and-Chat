import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import Header from '../components/home/Header';
import CommunityFeed from '../components/community/CommunityFeed';

export default function CommunityScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <CommunityFeed />
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