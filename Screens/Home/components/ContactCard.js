import React, {useState} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import ModalAction from './ModalAction'

const ContactCard = ({item, getContacts}) => {
    const [isModalVisibleAction, setIsModalVisibleAction] = useState(false)

    return (
        <>
            <View style={styles.card}>
                <View style={styles.contact}>
                    <Image style={styles.photo} source={{uri : item.photo}} />
                    <View style={styles.nameWrap}>
                        <Text style={styles.title}>{item.firstName} ( {item.age} yo )</Text>
                        <Text style={styles.subtitle}>{item.lastName}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() =>  setIsModalVisibleAction(true)}>
                    <Image style={styles.imgButton} source={require('../../../Assets/Icons/ellipsis.png')}  />
                </TouchableOpacity>
            </View>
            <ModalAction isModalVisible={isModalVisibleAction} closeModal={() => setIsModalVisibleAction(false)} getContact={getContacts} item={item}/>
        </>
    )
}

const styles = StyleSheet.create({
    subtitle : {

    },

    title : {
        fontWeight : "bold"
    },

    nameWrap : {
        marginHorizontal : 16
    },

    contact : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center"
    },

    card :{
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        backgroundColor : "#fff",
        borderRadius : 8,
        padding : 16,
        marginBottom : 18,
        elevation: 4,
    },
    
    photo : {
        height: 70,
        width : 70,
        borderRadius : 70,
        backgroundColor : "#ddd",
        borderColor : "grey",
        borderWidth : 2
    },

    imgButton : {
        height : 36,
        width : 36
    }
})


export default ContactCard