import { Text, View, StyleSheet, TouchableOpacity, Modal, ScrollView, Touchable } from 'react-native';
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
                        
                        {/* Notifcations testing  */}
                        <ScrollView style={styles.notificationList}>

                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationIcon}>👨‍🍳</Text>
                                    <View style={styles.notificationText}>
                                        <Text style={styles.notificationTitle}>Testing notificationTitle 1</Text>
                                        <Text style={styles.notificationSubtitle}>Testing notificationSubtitle 1</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationIcon}>👨‍🍳</Text>
                                    <View style={styles.notificationText}>
                                        <Text style={styles.notificationTitle}>Testing notificationTitle 2</Text>
                                        <Text style={styles.notificationSubtitle}>Testing notificationSubtitle 2</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationIcon}>👨‍🍳</Text>
                                    <View style={styles.notificationText}>
                                        <Text style={styles.notificationTitle}>Testing notificationTitle 3</Text>
                                        <Text style={styles.notificationSubtitle}>Testing notificationSubtitle 3</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationIcon}>👨‍🍳</Text>
                                    <View style={styles.notificationText}>
                                        <Text style={styles.notificationTitle}>Testing notificationTitle 4</Text>
                                        <Text style={styles.notificationSubtitle}>Testing notificationSubtitle 4</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            

                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationIcon}>🔥</Text>
                                    <View style={styles.notificationText}>
                                        <Text style={styles.notificationTitle}>Testing notificationTitle 5</Text>
                                        <Text style={styles.notificationSubtitle}>Testing notificationSubtitle 5</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationIcon}>🔥</Text>
                                    <View style={styles.notificationText}>
                                        <Text style={styles.notificationTitle}>Testing notificationTitle 5</Text>
                                        <Text style={styles.notificationSubtitle}>Testing notificationSubtitle 5</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationIcon}>🔥</Text>
                                    <View style={styles.notificationText}>
                                        <Text style={styles.notificationTitle}>Testing notificationTitle 5</Text>
                                        <Text style={styles.notificationSubtitle}>Testing notificationSubtitle 5</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </ScrollView>
                        {/* until here */}

                        <TouchableOpacity onPress={()=>setModalVisible(false)} style={styles.closeButtonContainer}>
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
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F1E5CE',
        borderBottomWidth: 1,
        borderColor: '#2A2A2A', 
    },
    appName:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F1F1F',
        justifyContent: 'center',

    },

    rightButtons:{
        flexDirection: 'row',
        gap: 20,
        paddingRight: 6
    },


    button:{
        borderRadius: 8,
        backgroundColor: '#A5633D',
        shadowColor: '#1f0c0cff',
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        padding: 8,
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
        backgroundColor: '#F8F5F0',
        padding: 20,
        borderRadius: 12,
        width: '90%',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#3F3A36',
    },

    // notification testing input styles

    notificationList: {
        marginBottom: 16,
        maxHeight: 320 // so we only have aprox 4 notifications on the screen
    },

    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#f1e5ceff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E9E0C7',
    },
    notificationIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    notificationText: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#3F3A36',
        marginBottom: 4,
    },
    notificationSubtitle: {
        fontSize: 13,
        color: '#666',
    },
    closeButtonContainer: {
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#E9E0C7',
    },
    modalCloseButton: {
        color: '#A7845C',
        fontSize: 16,
        fontWeight: '600',
    },
});