import { Text, View, StyleSheet, Image } from 'react-native'


export default function FeaturedChef(){

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>👨‍🍳 Featured Chef Review</Text>
            
            <View style={styles.reviewCard}>
                <View style={styles.chefImagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>👨‍🍳</Text>
                </View>
                
                <View style={styles.reviewContent}>
                    <Text style={styles.reviewTitle}>This week:</Text>
                    <Text style={styles.reviewText}>Chef Ramsay's Disappointment</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 24,
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    reviewCard: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
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
        color: '#333',
    },
});