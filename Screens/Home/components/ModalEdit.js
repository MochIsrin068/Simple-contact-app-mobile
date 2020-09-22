import React, {useState, useEffect} from 'react'
import {Text, Button, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, PixelRatio, Image} from 'react-native'
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker'
import API from '../../../Services/API'

const ModalEdit = ({isModalVisible, closeModal, getContacts, item}) => {
    const [data, setData] = useState({firstName : null, lastName : null, age : null, photo : null})
    const [avatarSource, setAvatarSource] = useState(null)
    const [avatarSourceName, setAvatarSourceName] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const [contactLoading, setContactLoading] = useState(true)

    const getDetailContact = () => {
        API.getDetailContact(item.id).then(response => {
            setContactLoading(false),
            setData({
                firstName : response.data.firstName,
                lastName : response.data.lastName,
                age : response.data.age,
                photo : response.data.photo
            })
            setAvatarSourceName(response.data.photo)
            setAvatarSource({uri : response.data.photo})
        })
    }

    useEffect(() => {
        getDetailContact()
    })

    selectPhotoTapped = ()  =>{
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            let source = {uri: response.uri};
            setAvatarSource(source)
            setAvatarSourceName(response.fileName)
            setData({...data, photo : source.uri})
        }
        });
    }

    const updateContact = () => {
        setIsSubmitting(true)
        API.updateContact(item.id, data).then(response => {
            setAvatarSourceName(null)
            setAvatarSource(null)
            closeModal()
            getContacts()
        })
    }

    return (
        <Modal 
            isVisible={isModalVisible}
            onSwipeComplete={closeModal}
            swipeDirection={['down']}
            style={styles.modal}
            >
            {contactLoading ? null :  
            <View style={styles.content}>
                <View style={styles.input}>
                    <Text style={styles.contentTitle}>Edit Contact {item.firstName} {item.lastName}</Text>
                    <TouchableOpacity onPress={closeModal}><Text style={styles.contentTitle}>X</Text></TouchableOpacity>
                </View>
                <View style={styles.input}>
                    <Text>FirstName :</Text>
                    <TextInput placeholder="FirtName" style={styles.textInput} value={data.firstName}  onChangeText={(value) => setData({...data, firstName : value})}/>
                </View>
                <View style={styles.input}>
                    <Text>LastName :</Text>
                    <TextInput placeholder="LastName" style={styles.textInput} value={data.lastName} onChangeText={(value) => setData({...data, lastName : value})}/>
                </View>
                <View style={styles.input}>
                    <Text>Age :</Text>
                    <TextInput placeholder="Age" keyboardType="numeric" value={data.age} style={styles.textInput} onChangeText={(value) => setData({...data, age : value})}/>
                </View>
                <View style={styles.input}>
                    <Text>Image :</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail'  style={{flexShrink: 1, width : 180,  }}>{avatarSourceName === null ? "No Image" : avatarSourceName}</Text>
                    <Button onPress={() => selectPhotoTapped()} title={avatarSource === null ? "Upload" : 'Uploaded'} />                 
                </View>               
                <Button 
                    disabled={isSubmitting ? true : data.age === null || data.firstName === null || data.lastName === null || data.photo === null ? true : false} 
                    title={isSubmitting ? "Updated..." : "Update"} 
                    onPress={() => updateContact()}/>
            </View>
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },


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
    contentTitle: {
        fontSize: 18,
        marginBottom: 12,
    },

    input : {
        display  : "flex",
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row",
        marginBottom : 16
    },

    textInput : {
        backgroundColor : "#ddd",
        width : Dimensions.get("screen").width - 120,
        paddingVertical : 4,
        paddingHorizontal :16,
        borderRadius : 6
    }
})

export default ModalEdit