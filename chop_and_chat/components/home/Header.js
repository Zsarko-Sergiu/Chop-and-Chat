import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'


export default function Header(){

    return(
        <View style={styles.container}>
            <Text style={styles.appName}>🍳 Cook&Chat</Text>

            <View style={styles.rightButtons}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>🔔</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>👤</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        //borderBottomColor: '#e0e0e0', check later the colors
    },
    appName:{
        fontSize: 22,
        fontWeight: 'bold'
    },

    rightButtons:{
        flexDirection: 'row',
        gap: 20,
        paddingRight: 6
    },


    button:{
        borderRadius: 8,
        backgroundColor: '#cec7c7ff',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },

    buttonText:{
        fontSize: 20
    }

});