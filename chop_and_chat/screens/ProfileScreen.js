import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { AuthContext, navigationRef } from '../navigation';

export default function ProfileScreen({ navigation }) {
  const auth = useContext(AuthContext);
  const session = auth?.user;
  const profile = session?.user || session; // handle session shapes { token, user } or plain user
  const displayName = profile?.name || profile?.email || 'User';

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // reset navigation to Auth (Login) screen
      if (navigationRef && navigationRef.current && navigationRef.current.resetRoot) {
        navigationRef.current.resetRoot({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }
      // fallback if navigationRef not available
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (err) {
      console.warn('logout error', err);
      Alert.alert('Error', 'Could not logout');
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* Profile Header */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/favicon.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.username}>{displayName}</Text> 
        <Text style={styles.bio}>Food enthusiast</Text> 
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Recipes searched</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>50</Text>
          <Text style={styles.statLabel}>Uploaded photos</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>My Recipes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Favorite Recipes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#467A9C'
    },

    header:{
        alignItems: 'center',
        paddingVertical: 30,
        marginBottom: 10
    },

    profileImage:{
        width: 50,
        height: 50
    },

    username:{
        fontSize: 24,
        marginBottom: 5,
        color: '#F8F5F0'
    },

    bio:{
        color: '#F8F5F0',
        fontSize: 16
    },

    statsContainer:{
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10
    },

    statBox:{
        flex: 1,
        alignItems: 'center'
    },

    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
  },

  menuContainer: {
    padding: 20,
    gap: 12
  }
});