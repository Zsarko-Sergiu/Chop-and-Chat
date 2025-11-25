import React, { useState, useContext } from 'react';
import { Modal, View, Text, Button, TextInput, Image, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext, navigationRef } from '../../navigation';

const BASE_URL =
  Platform.OS === "android" && !window.location
    ? "http://10.0.2.2:4000"   // Android Emulator ONLY
    : "http://localhost:4000"; // Web or iOS

export default function NewPostModal({ visible, onClose, onCreated }) {
  const auth = useContext(AuthContext);
  const token = auth?.user?.token;
  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
  const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!res.granted) {
    Alert.alert('Permission required', 'Media library permission is needed to pick images.');
    return;
  }

  const pick = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
  });

  console.log("RAW PICK:", pick);

  if (pick.canceled || pick.cancelled) return;

  // 🔥 FIX FOR WEB & MOBILE
  const uri = Platform.OS === "web"
    ? pick.assets?.[0]?.uri
    : pick.uri;

  console.log("RESOLVED URI:", uri);

  if (!uri) {
    Alert.alert("Error", "Could not load image.");
    return;
  }

  setImageUri(uri);
};

  const submit = async () => {
    if (!imageUri) { Alert.alert('Image required'); return; }
    try {
      console.log("Submitting with:", imageUri);
      setUploading(true);
      const form = new FormData();
      const filename = imageUri.split('/').pop();
      const type = "image/jpeg";
      form.append('image', { uri: imageUri, name: filename, type });
      if (caption) form.append('caption', caption);

      const res = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form,
      });

      const body = await res.json();
      if (!res.ok) {
        Alert.alert('Upload failed', body.error || 'Server error');
      } else {
        onCreated(body.post);
        setCaption('');
        setImageUri(null);
      }
    } catch (err) {
      console.warn('upload error', err);
      Alert.alert('Upload error');
    } finally {
      setUploading(false);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 12 }}>
        <Button title="Close" onPress={onClose} />
        <View style={{ marginTop: 12 }}>
          <TouchableOpacity onPress={pickImage} style={styles.pick}>
            <Text>{imageUri ? 'Change Image' : 'Pick an image'}</Text>
          </TouchableOpacity>
          {imageUri ? <Image source={{ uri: imageUri }} style={{ width: '100%', height: 250, marginVertical: 12 }} /> : null}
          <TextInput placeholder="Caption (optional)" value={caption} onChangeText={setCaption} style={{ borderWidth: 1, padding: 8, marginBottom: 12 }} />
          <Button title={uploading ? 'Uploading...' : 'Post'} onPress={submit} disabled={uploading} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pick: { padding: 12, backgroundColor: '#F1E5CE', borderRadius: 8, alignItems: 'center' }
});