import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default function TabTopBar(props){
    return(
        <View>
            <Text style={styles.topBar}>Players: {props.playerTotal}/5</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    topBar:{
        fontFamily:"sans-serif-thin",
        fontSize:20,
        textAlign:"center",
        marginBottom:5
      }
})