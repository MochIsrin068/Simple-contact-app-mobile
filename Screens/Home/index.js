import React, {useEffect,useState} from 'react'
import {View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native'
import ContactCard from './components/ContactCard'
import Header from './components/Header'
import API from '../../Services/API'
import ModalCreate from './components/ModalCreate'

const Home = () => {
    const [contact, setContact] = useState({isLoading : true, data : []})
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false)

    const getContacts = () => {
        API.getContact().then(response => {
            setContact({
                isLoading : false,
                data : response.data
            })
        })
    }

    useEffect(() => {
        getContacts()
    })


    return(
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                    
                <View style={styles.container}>
                    <Header />
                    <View style={styles.list}>
                        {contact.isLoading || contact.data.length < 1 ?
                                <View style={{ marginTop : Dimensions.get("screen").height / 6, display : "flex", alignItems : "center"}}>
                                    <Image source={require('../../Assets/Images/empty.png')}  style={{width : 250, height : 250}}/>
                                    <Text style={{textAlign : "center", fontSize : 18}}>Data Is Empty</Text>
                                </View>
                            : contact.data.map(item => {
                                return <ContactCard item={item} key={item.id} getContact={getContacts}/>
                            })
                        }
                    </View>
                    <ModalCreate isModalVisible={isModalVisibleCreate} closeModal={() => setIsModalVisibleCreate(false)} getContact={getContacts}/>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.buttonAddWrap} onPress={() => setIsModalVisibleCreate(true)}>
                <Image style={styles.addButton} source={require('../../Assets/Icons/add-button.png')}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 16,
        paddingVertical : 32,
        backgroundColor: "#fdfdff",
        height : Dimensions.get("screen").height,
        marginBottom : 150
    },

    buttonAddWrap : {
        position : 'absolute',
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        elevation : 4,
        bottom : 40,
        right : 20,
    },

    addButton : {
        height : 50,
        width : 50,
        elevation : 4,
    },

    list : {
        marginTop : Dimensions.get("screen").height / 10
    }
})

export default Home