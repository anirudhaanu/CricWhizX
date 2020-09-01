
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import TeamSelector from './TeamSelectorClass'
import * as data from '../Resources/data.json'
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="default"/>
      <TeamSelector data={data.players}
                    onSubmit={(players) => { 
                      console.log(players)
                    }} 
                  />
                  
      
    </NavigationContainer>
  );
};



export default App;
