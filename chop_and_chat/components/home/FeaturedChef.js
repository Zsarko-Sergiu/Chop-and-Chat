import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';

export default function FeaturedChef() {
    const reviews = [
        { id: 1, title: "This week", text: "Chef Ramsay's Disappointment", chef: "Gordon Ramsay" },
        { id: 2, title: "Last week", text: "Gordon's Kitchen Nightmares", chef: "Gordon Ramsay" },
        { id: 3, title: "2 weeks ago", text: "The Perfect Wellington", chef: "Gordon Ramsay" },
        { id: 4, title: "A month ago", text: "Hell's Kitchen Fiasco", chef: "Gordon Ramsay" },
        { id: 5, title: "2 months ago", text: "MasterChef Mayhem", chef: "Gordon Ramsay" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Featured Chef Review</Text>
                <Text style={styles.sectionSubtitle}>See what the pros think</Text>
            </View>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {reviews.map((review) => (
                    <Pressable 
                        key={review.id} 
                        style={({ pressed }) => [
                            styles.reviewCard,
                            pressed && styles.reviewCardPressed
                        ]}
                        onPress={() => console.log('Review pressed:', review.id)}
                    >
                        <View style={styles.chefAvatar}>
                            <Text style={styles.chefInitial}>GR</Text>
                        </View>
                        <View style={styles.reviewContent}>
                            <Text style={styles.reviewTime}>{review.title}</Text>
                            <Text style={styles.reviewText}>{review.text}</Text>
                            <Text style={styles.reviewChef}>{review.chef}</Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#BFDBFE',
        fontWeight: '400',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },
    reviewCard: {
        width: 280,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    reviewCardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    chefAvatar: {
        width: 56,
        height: 56,
        backgroundColor: '#3B82F6',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    chefInitial: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    reviewContent: {
        gap: 6,
    },
    reviewTime: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    reviewText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        lineHeight: 22,
    },
    reviewChef: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '400',
        marginTop: 2,
    },
});