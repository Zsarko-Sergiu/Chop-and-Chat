import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthStack from '../screens/AuthStack';

import { AuthContext, navigationRef } from '../navigation'; 

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Community" component={CommunityScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('session_user');
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        console.warn('restore session failed', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const auth = {
    user,
    signIn: async (session) => {
      await AsyncStorage.setItem('session_user', JSON.stringify(session));
      setUser(session);
      try { navigationRef.current?.resetRoot({ index: 0, routes: [{ name: 'Main' }] }); } catch {}
    },
    signOut: async () => {
      await AsyncStorage.removeItem('session_user');
      setUser(null);
      try { navigationRef.current?.resetRoot({ index: 0, routes: [{ name: 'Auth' }] }); } catch {}
    },
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user ? 'Main' : 'Auth'}>
          <RootStack.Screen name="Auth" component={AuthStack} />
          <RootStack.Screen name="Main" component={MainStackScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}