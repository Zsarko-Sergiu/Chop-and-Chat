import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, Platform } from 'react-native';
import PostCard from './PostCard';
import NewPostModal from './NewPostModal';
import { AuthContext, navigationRef } from '../../navigation';

const BASE_URL =
  Platform.OS === "android" && !window.location
    ? "http://10.0.2.2:4000"   // Android Emulator ONLY
    : "http://localhost:4000"; // Web or iOS

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const auth = useContext(AuthContext);
  const token = auth?.user?.token;

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/posts`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const body = await res.json();
      setPosts(body.posts || []);
    } catch (err) {
      console.warn('load posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onCreated = (newPost) => {
    // ensure image_url used by PostCard
    const postWithUrl = { ...newPost, image_url: `${BASE_URL}${newPost.image_path}` };
    setPosts(prev => [ postWithUrl, ...prev ]);
    setShowNew(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Community</Text>
        <Button title="New Post" onPress={() => setShowNew(true)} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} onRefresh={load} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListEmptyComponent={<Text style={styles.placeholder}>No posts yet — create one!</Text>}
      />

      <NewPostModal visible={showNew} onClose={() => setShowNew(false)} onCreated={onCreated} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '600', color: '#F8F5F0' },
  placeholder: { color: '#F8F5F0', textAlign: 'center', padding: 20 }
});