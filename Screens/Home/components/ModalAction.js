import React, {useState} from 'react'
import {Text, Button, View, StyleSheet, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal';
import API from '../../../Services/API'
import ModalEdit from '../components/ModalEdit'

const ModalAction = ({isModalVisible, closeModal, getContacts, item}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const deleteContact = (ID) => {
        setIsDeleting(true)
        API.deleteContact(ID).then(response => {
            setIsDeleting(false)
            closeModal()
            getContacts()
        })
    }

    return (
        <>
            <Modal 
                isVisible={isModalVisible}
                onSwipeComplete={closeModal}
                swipeDirection={['down']}
                style={styles.modal}
                >
                <View style={styles.content}>
                    <View style={styles.input}>
                        <Text style={styles.contentTitle}>More Actions for {item.firstName + item.lastName}</Text>
                        <TouchableOpacity onPress={closeModal}><Text style={styles.contentTitle}>X</Text></TouchableOpacity>
                    </View>
                    <Button 
                        title="Edit"
                        color="green"
                        disabled={isEditing ? true : false}
                        onPress={() => setIsEditing(true)}
                    />
                    <View style={{height : 10}} />
                    <Button 
                        title="Delete"
                        color="red"
                        onPress={() => deleteContact(item.id)}
                        disabled={isDeleting ? true : false}
                    />
                </View>
            </Modal>
            <ModalEdit isModalVisible={isEditing} closeModal={() => setIsEditing(false)} getContact={getContacts} item={item}/>
        </>
    )
}

const styles = StyleSheet.create({
    modal : {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: '#fff',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius : 16,
        borderTopRightRadius : 16,
    },
    input : {
        display  : "flex",
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row",
        marginBottom : 16
    },

    contentTitle: {
        fontSize: 16,
        marginBottom: 12,
    },
})

export default ModalAction