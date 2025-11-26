import React from "react";
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      
      {/* Profile Header */}
      <View style={styles.header}>
        <Image 
          source={require("../assets/favicon.png")}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Antonio</Text>
        <Text style={styles.bio}>Food enthusiast</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Recipes searched</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50</Text>
          <Text style={styles.statLabel}>Uploaded photos</Text>
        </View>
      </View>

            {/* Menu */}
            <View style={styles.menuContainer}>
                <Pressable 
                    style={({ pressed }) => [
                        styles.menuItem,
                        pressed && styles.menuItemPressed
                    ]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <View style={styles.menuItemLeft}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="list-outline" size={22} color="#3B82F6" />
                        </View>
                        <Text style={styles.menuText}>My Recipes</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </Pressable>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="heart-outline" style={styles.icon} />
          <Text style={styles.menuText}>Favorite Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" style={styles.icon} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>

            {/* Logout */}
            <Pressable 
                style={({ pressed }) => [
                    styles.logoutButton,
                    pressed && styles.logoutButtonPressed
                ]}
                onPress={() => console.log('Logout pressed')}
            >
                <Text style={styles.logoutText}>Log out</Text>
            </Pressable>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  statLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#555",
  },

  menuContainer: {
    marginTop: 30,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  icon: {
    marginRight: 10,
    color: "#333",
    fontSize: 20
  },

  menuText: {
    fontSize: 16,
    color: "#333",
  },

  logoutButton: {
    marginTop: 30,
    paddingVertical: 15,
    alignItems: "center",
  },

  logoutText: {
    color: "#d9534f",
    fontSize: 18,
    fontWeight: "600",
  },
});
