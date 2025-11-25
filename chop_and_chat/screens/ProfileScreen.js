import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { AuthContext, navigationRef } from '../App';

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
          source={require("../assets/favicon.png")}
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

      {/* Menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="list-outline" style={styles.icon} />
          <Text style={styles.menuText}>My Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="heart-outline" style={styles.icon} />
          <Text style={styles.menuText}>Favorite Recipes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F6",
  },

  header: {
    alignItems: "center",
    backgroundColor: "#467A9C",
    paddingVertical: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  bio: {
    color: "#dfeaf0",
    fontSize: 14,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },

  statCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "40%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
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