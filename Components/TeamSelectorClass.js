
import React,{useState,useEffect,useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,FlatList,TouchableOpacity,ImageBackground,Image,Alert
} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import PlayerList from './PlayerList'
import playerTypeSpliter from './playerTypeSpliter'


const Tab = createMaterialTopTabNavigator();



export default class TeamSelector extends React.Component{
  constructor(props){
      super(props);
      this.state={
          playerTotal:0,
          batsmans:[],
          bowlers:[],
          selectedArrayBat:[],
          selectedArrayBowl:[]
      }
  }
  
  componentDidMount(){
    var playerTypeObject=playerTypeSpliter(this.props.data)
    this.setState({batsmans:playerTypeObject.batsmans,bowlers:playerTypeObject.bowlers})
  }


  callBackFromList=(changer,selectedArrayFromList,role)=>{  
       this.setState(prevState=>({playerTotal:prevState.playerTotal+changer}))
       if(role==="batsman") this.setState({selectedArrayBat:selectedArrayFromList})
       else this.setState({selectedArrayBowl:selectedArrayFromList})
  }

  sendDataToParent=()=>{
    var temp=this.state.selectedArrayBat.concat(this.state.selectedArrayBowl);
    Alert.alert("Data sent to console !")
    this.props.onSubmit(temp);
    
  }
   
render(){
    return(
      <ImageBackground source={require('../Resources/stadium.jpg')} blurRadius={1} opacity={.8} style={styles.imageBackground}>
                
                <Text style={styles.topBar}>Players: {this.state.playerTotal}/5</Text>
    
                <Tab.Navigator  sceneContainerStyle={{backgroundColor:"rgba(28,14,50,.8)"}}
                                tabBarOptions={{
                                  style:styles.tabBar,
                                  labelStyle:styles.tabBarLabel,
                                  indicatorStyle:styles.indicator
                                }}>
                  
                    <Tab.Screen name="batsman"  >
                        {() => <PlayerList data={this.state.batsmans} 
                                           playerTotal={this.state.playerTotal} 
                                           callBack={this.callBackFromList} />
                        }
                    </Tab.Screen>
                    <Tab.Screen name="bowler" >
                        {() => <PlayerList data={this.state.bowlers} 
                                           playerTotal={this.state.playerTotal} 
                                           callBack={this.callBackFromList} />
                        }
                    </Tab.Screen>
               </Tab.Navigator>
              
              <View style={styles.buttonView}>
                <TouchableOpacity style={[styles.button,{opacity:this.state.playerTotal===5?1:.4}]} 
                                  disabled={this.state.playerTotal===5?false:true} 
                                  onPress={this.sendDataToParent}>
                  {this.state.playerTotal===5 && <Image source={require('../Resources/done.png')} style={styles.iconDone}/>}
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
      </ImageBackground>
    )}
}

const styles=StyleSheet.create({
  topBar:{
    fontFamily:"sans-serif-thin",
    fontSize:20,
    textAlign:"center",
    marginBottom:5
  },
  imageBackground:{
    backgroundColor:"black",
    display:"flex",
    flex:1
  },
  tabBar:{
    backgroundColor:"#212223fc"
  }, 
  indicator:{
    backgroundColor:"white",
    opacity:.7
  },
  tabBarLabel:{
    color:"white",
    fontSize:15,
    opacity:.8
    
  },
  buttonView:{
    backgroundColor:"rgba(0,0,0,.5)",
    alignItems:"flex-end",
    height:50,
    display:"flex",
    justifyContent:"center"
    
  },
  button:{
    backgroundColor:"#03655c",
    width:100,
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


