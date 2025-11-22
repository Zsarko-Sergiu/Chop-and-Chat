import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style = {styles.container}>

      {/* Profile Header */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/favicon.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.username}>Antonio</Text> 
        <Text style={styles.bio}>Food enthusiast </Text> 
      </View>


        {/* TODO: trebe facut  carduri pentru astea 2 de stats, ca si la main actions */}
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style = {styles.statBox}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Recipes searched</Text>
        </View>
        </View>
        <View style = {styles.statBox}>
          <Text style={styles.statNumber}>50</Text>
          <Text style={styles.statLabel}>Uploaded photos</Text>
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
        
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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



})