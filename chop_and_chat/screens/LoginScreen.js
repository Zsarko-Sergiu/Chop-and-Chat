import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, navigationRef } from '../navigation';

const BASE_URL = 'http://localhost:4000'; // change for emulator/device as noted above

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Email and password are required');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        Alert.alert('Login failed', body.error || 'Invalid credentials');
        return;
      }

      const { token, user } = body;
      if (!token || !user) {
        Alert.alert('Login failed', 'Server response missing token/user');
        return;
      }

      const session = { token, user };
      await AsyncStorage.setItem('session_user', JSON.stringify(session));
      await auth.signIn(session);

      // navigate to main app (Home). use navigationRef so we reset the whole nav stack.
      try {
        if (navigationRef && navigationRef.current && navigationRef.current.resetRoot) {
          navigationRef.current.resetRoot({ index: 0, routes: [{ name: 'Home' }] });
          return;
        }
      } catch (e) {
        // fallback: nothing — App gating will show Home
      }

    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'Could not reach server');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <Button title="Login" onPress={onLogin} />
      <View style={{ height: 12 }} />
      <Button title="Create account" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}