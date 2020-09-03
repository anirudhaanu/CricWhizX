
import React,{useState} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,Alert} from 'react-native';

import TabTopBar from './TabTopBar'

export default function Tab(props){
   
   var [currentIndex,setCurrentIndex]=useState(0)
   var [tabTitlesNumber,setTabTitlesNumber]=useState([0,0])
   var [selectedBatsmans,setSelectedBatsmans]=useState([])
   var [selectedBowlers,setSelectedBowlers]=useState([])

   const setTitle=(index,tabTitleNumber)=>{
         var temp=tabTitlesNumber;
         temp[index]=tabTitleNumber;
         setTabTitlesNumber(temp);     
    }
    const sendDataToParent=()=>{
        var temp=selectedBatsmans.concat(selectedBowlers);
        props.callBack(temp);
        Alert.alert("Data sent to console !")
    }
    const callBack=(selectedPlayersFromList)=>{
         if(selectedPlayersFromList[0].role==="batsman") setSelectedBatsmans(selectedPlayersFromList);
         else setSelectedBowlers(selectedPlayersFromList)
    }
   
  
    
    return(
        <View style={{flex:1,display:"flex",width:"100%",alignItems:"center",justifyContent:"center"}}>
           <TabTopBar playerTotal={selectedBatsmans.length+selectedBowlers.length}/>

           <View style={styles.tabBar}>
               {
                   props.children.map((item,index)=>{
                       return(
                       <TouchableOpacity key={index}  onPress={()=>setCurrentIndex(index)} 
                                         style={{borderBottomWidth:currentIndex===index?1:0,borderBottomColor:"white"}}>
                           <Text style={styles.tabBarLabel}>
                                {item.props.title+"("+tabTitlesNumber[index]+")"}
                           </Text>
                        </TouchableOpacity>)
                   })
               }
           </View>
           
           {
               props.children.map((item,index)=>{
                   return(
                       <View key={index} style={[styles.tabContainer,{display:index===currentIndex?"flex":"none"}]} >
                           {React.cloneElement(props.children[index],{
                             playerTotal:selectedBatsmans.length+selectedBowlers.length,
                             index:index,
                             setTitle:setTitle,
                             callBack:callBack})}
                           
                       </View>
                   )
               })
           }


           <View style={styles.buttonView}>
                <TouchableOpacity style={[styles.button,{opacity:selectedBatsmans.length+selectedBowlers.length===5?1:.6}]} 
                                  disabled={selectedBatsmans.length+selectedBowlers.length===5?false:true} 
                                  onPress={sendDataToParent}>
                  {selectedBatsmans.length+selectedBowlers.length===5 && <Image source={require('../Resources/done.png')} style={styles.iconDone}/>}
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
        </View>
    )
}

const styles=StyleSheet.create({
    tabBar:{
        backgroundColor:"#212223fc",
        display:"flex",
        flexDirection:"row",
        height:50,
        width:"100%",
        justifyContent:"space-around",
        alignItems:"center"
      }, 
      tabBarLabel:{
        color:"white",
        fontSize:17,
        opacity:.8,
        paddingBottom:10,
        fontFamily:"sans-serif"
        
        
      },
      tabContainer:{
        flex:1,
        display:"flex",
        width:"100%",
        alignItems:"center",
        justifyContent:"center"

      },
    buttonView:{
      backgroundColor:"rgba(48,49,51,1)",
      alignItems:"flex-end",
      height:50,
      display:"flex",
      justifyContent:"center",
      width:"100%"
      
    },
    button:{
      backgroundColor:"#03655c",
      width:110,
      borderRadius:20,
      marginRight:5,
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
      
      
    },
    buttonText:{
      color:"white",
      textAlign:"center",
      textAlignVertical:"center",
      paddingVertical:7,
      fontSize:15,
      fontFamily:'sans-serif',
      opacity:.8
    },
    iconDone:{
      paddingVertical:7,
      height:20,
      width:20,
      marginRight:2
    }
  })
  
  
  