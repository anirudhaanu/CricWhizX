
import React from 'react';
import {View,StatusBar} from 'react-native';

import TeamSelector from './TeamSelector'
import * as data from '../Resources/data.json'


function App() {
  return (
    <View style={{display:"flex",flex:1}}>
      <StatusBar barStyle="default"/>
      <TeamSelector data={data.players}
                    onSubmit={(players) => { 
                      console.log(players)
                    }} 
                  
                  />
                  
      
    </View>
  );
};



export default App;
