import {Text, View, StyleSheet, TouchableOpacity } from 'react-native'


export default function MainActions(){

    return(
        <View style= {styles.container}>
            <TouchableOpacity style={styles.card}>
                {/* <Text style={styles.icon}>🥘</Text> */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Find a Recipe</Text>
                    <Text style={styles.subtitle}>Turn leftovers into something edible</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.card}>
                {/* <Text style={styles.icon}>📸</Text> */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Upload Your Dish</Text>
                    <Text style={styles.subtitle}>Ready to be judged?</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        padding: 20,
        gap: 18
    },


    card:{
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        padding: 25,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,

        borderWidth: 1,
        borderColor: '#e0e0e0',
    },


    textContainer:{
        flex: 1
    },

    title:{
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },

    subtitle:{
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },

    arrow: {
        fontSize: 24,
        color: '#999',
        marginLeft: 12,
    }
});