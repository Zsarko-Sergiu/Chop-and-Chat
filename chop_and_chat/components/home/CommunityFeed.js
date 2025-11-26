import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

export default function CommunityFeed(){
    const posts = [
        { id: 1, title: "Homemade Pizza Margherita", description: "Just made my first pizza from scratch! The dough came out perfect.", author: "John Doe" },
        { id: 2, title: "Grandma's Secret Pasta Recipe", description: "Finally convinced grandma to share her famous carbonara recipe.", author: "Jane Smith" },
        { id: 3, title: "Vegan Chocolate Cake", description: "Who said vegan desserts can't be delicious? This cake is amazing!", author: "Mike Johnson" },
        { id: 4, title: "Sunday Brunch Special", description: "Eggs benedict with hollandaise sauce - turned out better than expected.", author: "Sarah Lee" },
        { id: 5, title: "Thai Curry Adventure", description: "First time making green curry. The spice level is just right!", author: "Alex Brown" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>🔥 Community Feed</Text>
            
            <ScrollView 
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.scrollContent}
            >
                {posts.map((post) => (
                    <TouchableOpacity 
                        key={post.id} 
                        style={styles.postCard}
                        onPress={() => console.log('Post pressed:', post.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.dishImagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>🍽️</Text>
                        </View>
                        
                        <View style={styles.postContent}>
                            <Text style={styles.postTitle}>{post.title}</Text>
                            <Text style={styles.postDescription}>{post.description}</Text>
                            <Text style={styles.postAuthor}>by {post.author}</Text>
                        </View>
                        
                        <Text style={styles.tapToView}>Tap to view →</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 20,
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#2A2A2A',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#F8F5F0',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    postCard: {
        backgroundColor: '#F1E5CE',
        padding: 14,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    dishImagePlaceholder: {
        width: '100%',
        height: 120,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    imagePlaceholderText: {
        fontSize: 48,
    },
    postContent: {
        gap: 6,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F1F1F',
    },
    postDescription: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    postAuthor: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        marginTop: 4,
    },
    tapToView: {
        fontSize: 12,
        color: '#467A9C',
        fontWeight: '600',
        marginTop: 8,
        textAlign: 'right',
    },
});