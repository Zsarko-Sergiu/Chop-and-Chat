import { Text, View, StyleSheet } from 'react-native'

export default function CommunityFeed() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔥 Community Feed</Text>
            <Text style={styles.placeholder}>Feed content coming soon...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        marginTop: 8,

    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    placeholder: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        padding: 20,
    },
});