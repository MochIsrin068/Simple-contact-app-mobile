import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Contact App</Text>
            <Text style={styles.subtitle}>Management Your Contact</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        position : 'absolute',
        width : Dimensions.get("screen").width,
        backgroundColor:  "#2da9d4",
        height : Dimensions.get("screen").height / 5,
        padding : 16
    }, 

    title : {
        color : "#fff",
        fontWeight : "bold",
        fontSize : 24,
        textAlign : "center",
        marginVertical : 6
    }, 
    
    subtitle : {
        color : "#fff",
        fontSize : 16,
        textAlign : "center"
    }

})

export default Header 