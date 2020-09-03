
import React from 'react';
import { StyleSheet,View} from 'react-native';


export default function TabItem(props){
  
  

return(
   <View  style={styles.tabItemContainer}>
       
        
        {React.cloneElement(props.children,{
          index:props.index,
          setTitle:props.setTitle,
          callBack:props.callBack,
          playerTotal:props.playerTotal})}                               
   </View>
  )
}

const styles=StyleSheet.create({
  tabItemContainer:{
    display:"flex",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    width:"100%"}
})