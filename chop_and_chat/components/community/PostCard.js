import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Button, Platform } from 'react-native';
import { AuthContext, navigationRef } from '../../navigation';

const BASE_URL =
  Platform.OS === "android" && !window.location
    ? "http://10.0.2.2:4000"   // Android Emulator ONLY
    : "http://localhost:4000"; // Web or iOS

export default function PostCard({ post, onRefresh }) {
  const auth = useContext(AuthContext);
  const token = auth?.user?.token;
  const [liked, setLiked] = useState(Boolean(post.liked));
  const [likes, setLikes] = useState(post.like_count || 0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const toggleLike = async () => {
    try {
      const method = liked ? 'DELETE' : 'POST';
      const res = await fetch(`${BASE_URL}/posts/${post.id}/like`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      setLiked(!liked);
      setLikes(body.like_count);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.warn('like error', err);
    }
  };

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      const res = await fetch(`${BASE_URL}/posts/${post.id}/comments`);
      const body = await res.json();
      setComments(body.comments || []);
    } catch (err) {
      console.warn('load comments', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const submitComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/posts/${post.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: commentText }),
      });
      if (res.ok) {
        setCommentText('');
        await loadComments();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.warn('comment error', err);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.author}>{post.author_name || post.author_email}</Text>
        <Text style={styles.date}>{new Date(post.created_at).toLocaleString()}</Text>
      </View>

      <Image source={{ uri: post.image_url || `${BASE_URL}${post.image_path}` }} style={styles.image} />

      {post.caption ? <Text style={styles.caption}>{post.caption}</Text> : null}

      <View style={styles.actions}>
        <TouchableOpacity onPress={toggleLike} style={styles.actionBtn}>
          <Text>{liked ? '❤️' : '🤍'} {likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setCommentsOpen(true); loadComments(); }} style={styles.actionBtn}>
          <Text>💬 {post.comment_count || comments.length}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={commentsOpen} animationType="slide">
        <View style={{ flex: 1, padding: 12 }}>
          <Button title="Close" onPress={() => setCommentsOpen(false)} />
          <View style={{ flex: 1, marginTop: 12 }}>
            {comments.map(c => (
              <View key={c.id} style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
                <Text style={{ fontWeight: '600' }}>{c.author_name || c.author_email}</Text>
                <Text>{c.text}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>{new Date(c.created_at).toLocaleString()}</Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TextInput placeholder="Write a comment..." value={commentText} onChangeText={setCommentText} style={{ flex: 1, borderWidth: 1, padding: 8 }} />
            <TouchableOpacity onPress={submitComment} style={{ padding: 8, backgroundColor: '#A5633D', borderRadius: 8 }}>
              <Text style={{ color: '#fff' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#F1E5CE', padding: 12, borderRadius: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  author: { fontWeight: '600' },
  date: { fontSize: 12, color: '#666' },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 8 },
  caption: { marginBottom: 8 },
  actions: { flexDirection: 'row', gap: 12 },
  actionBtn: { marginRight: 12 }
});