
import React from 'react';
import {StyleSheet,View} from 'react-native';


import PlayerList from './PlayerList'
import playerTypeSpliter from './playerTypeSpliter'
import Tab from './Tab'
import TabItem from './TabItem'


export default function TeamSelector(props){
    
    
    const sendDataToParent=(list)=>{
        props.onSubmit(list)
    }
   


    return(
    <View style={styles.container}>
         
         
         <Tab callBack={sendDataToParent}>
             <TabItem key="bats" title="Batsman" >
                    <PlayerList data={playerTypeSpliter(props.data).batsmans}/>
             </TabItem>
             <TabItem key="bowl" title="Bowler" data={playerTypeSpliter(props.data).bowlers}>
                    <PlayerList data={playerTypeSpliter(props.data).bowlers} />
             </TabItem>
        </Tab>

    </View>
    )
}


const styles=StyleSheet.create({
    container:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
    }
})
    