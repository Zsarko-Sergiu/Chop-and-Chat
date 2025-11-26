import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function MainActions() {
    return (
        <View style={styles.container}>
            <Pressable 
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed
                ]}
                onPress={() => console.log('Find Recipe pressed')}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Find a Recipe</Text>
                    <Text style={styles.subtitle}>Turn leftovers into something edible</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>→</Text>
                </View>
            </Pressable>

            <Pressable 
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed
                ]}
                onPress={() => console.log('Upload Dish pressed')}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Upload Your Dish</Text>
                    <Text style={styles.subtitle}>Ready to be judged?</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>+</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    textContainer: {
        flex: 1,
        gap: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '400',
        lineHeight: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    },
    icon: {
        fontSize: 20,
        color: '#3B82F6',
        fontWeight: '600',
    },
});