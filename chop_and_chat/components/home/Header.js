import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

export default function Header(){

    const [modalVisibile, setModalVisible] = useState(false);


    return(
        <View style={styles.container}>
            <Text style={styles.appName}>🍳 Cook&Chat</Text>


            <View style={styles.rightButtons}>
                <TouchableOpacity style={styles.button} onPress={()=>setModalVisible(true)}>
                    <Text style={styles.buttonText}>🔔</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>👤</Text>
                </TouchableOpacity>

            </View>

            {/* sliding window after we press the notif icon */}

            <Modal visible={modalVisibile} transparent={false} animationType='slide'>
                <View style = {styles.modalContainer}>
                    <View style = {styles.modalContent}>
                        <Text style = {styles.modalTitle}>Notifications</Text>
                        <TouchableOpacity onPress={()=>setModalVisible(false)}>
                            <Text style = {styles.modalCloseButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0', 
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
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    closeButton: {
        color: 'blue',
        marginTop: 12,
    },
});