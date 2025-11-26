import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'


export default function FeaturedChef(){

    const reviews = [
        { id: 1, title: "This week:", text: "Chef Ramsay's Disappointment" },
        { id: 2, title: "Last week:", text: "Gordon's Kitchen Nightmares" },
        { id: 3, title: "2 weeks ago:", text: "The Perfect Wellington" },
        { id: 4, title: "A month ago:", text: "Hell's Kitchen Fiasco" },
        { id: 5, title: "2 months ago:", text: "MasterChef Mayhem" },
        { id: 6, title: "3 months ago:", text: "Culinary Catastrophe" },
    ];
    
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>👨‍🍳 Featured Chef Review</Text>
            
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {reviews.map((review) => (
                    <View key={review.id} style={styles.reviewCard}>
                        <View style={styles.chefImagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>👨‍🍳</Text>
                        </View>
                        
                        <View style={styles.reviewContent}>
                            <Text style={styles.reviewTitle}>{review.title}</Text>
                            <Text style={styles.reviewText}>{review.text}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 24,
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
    reviewCard: {
        flexDirection: 'row',
        backgroundColor: '#F1E5CE',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    chefImagePlaceholder: {
        width: 70,
        height: 70,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    imagePlaceholderText: {
        fontSize: 32,
    },
    reviewContent: {
        flex: 1,
    },
    reviewTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    reviewText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F1F1F',
    },
});