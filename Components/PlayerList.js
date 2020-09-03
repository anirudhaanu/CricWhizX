import React,{useState,useEffect} from 'react';
import {
  StyleSheet, View,  Text,FlatList,TouchableOpacity,ToastAndroid
} from 'react-native';


const ListHeaderComponent=(props)=>{return(
<View style={styles.listHeaderComponent}>
<Text style={[styles.rowTexttItem,{flex:2}]}>Choose 1-3 {props.type}</Text>
    <Text style={styles.rowTexttItem}>Credit</Text>
    <Text style={styles.rowTexttItem}>Team</Text>
</View>)
}

const showToast = (type) => {
    ToastAndroid.show(
      `You have already selected 3 ${type}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };


export default function PlayerList(props){
    //console.log(props);
    const callBackToTab=props.callBack;
    const setTitleToTab=props.setTitle;
    //const setTitle=props[0];

    var [data,setData]=useState([]);
    var [quantity,setQuantity]=useState(0);
    var [refresh,setRefreshFlag]=useState(true)
   // const navigation=useNavigation();
    
    useEffect(()=>{
        var temp=props.data;
        temp.map((item)=>item.selected=false)
        //console.log(temp)
        setData(temp);    
    },[props.data])
    
    const changeTabTitleNumber=(quantityTemp)=>{
        setTitleToTab(props.index,quantityTemp)
    }
    
    const callBackHandler=()=>{
        var selectedPlayersArray=[]
        var temp=data;
        temp.map(item=>{
            if(item.selected){
                selectedPlayersArray.push(item)
            }
        })
        callBackToTab(selectedPlayersArray);
    }



    const onPressPlayer=(index)=>{
        
        var temp=data;
        var quantityTemp=quantity;
        if(props.playerTotal===5  && !temp[index].selected ) return;
        if(quantityTemp===3 && !temp[index].selected ) {
            showToast(props.data[0].role);
            return;
        }
        
        temp[index].selected=!temp[index].selected;
        if(temp[index].selected) {
            quantityTemp=quantityTemp+1;
            
        }
        else {
             quantityTemp=quantityTemp-1;
                 
        }
        callBackHandler();
        setData(temp);
        setRefreshFlag(!refresh);
        setQuantity(quantityTemp);
        changeTabTitleNumber(quantityTemp);
        

    }

  
    const renderItem=({item,index})=>{ 
        return(
           <TouchableOpacity onPress={()=>onPressPlayer(index)} 
                             style={[styles.Item,{backgroundColor:item.selected?"rgba(19,40,71,.8)":"transparent"}]}>
                <Text style={[styles.rowTexttItem,{flex:2}]}>{item.name}</Text>
                <View style={[styles.rowTexttItem]}>
                    <Text style={styles.rowTexttItemBorder}>{item.credit}</Text>
                </View>
                <Text style={styles.rowTexttItem}>{item.team}</Text>
           </TouchableOpacity >
        )
    }


    return(
        <View style={styles.container}>  
           <FlatList
                ListHeaderComponent={<ListHeaderComponent type={data.length>0?data[0].role:""}/>}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                extraData={refresh}
                stickyHeaderIndices={[0]}
            />
        </View>
    );

}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#1c1036",
        display:"flex",
        flex:1,
        marginTop:0,
        width:"100%"
    },

    Item:{
        height:50,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        borderBottomColor:"rgba(255,255,255,.1)",
        borderBottomWidth:.5,
        

    },

    rowTexttItem:{
        color:"white",
        fontSize:15,
        fontFamily:"sans-serif-thin",
        flex:1,
        justifyContent:"space-between",
        display:"flex",
        margin:5,textAlign:"center",
    },

    rowTexttItemBorder:{
        borderWidth:1,
        borderRadius:5,
        borderColor:"rgba(155,155,0,.5)",
        textAlign:"center",
        marginHorizontal:25,
        color:"white" 
    },
    
    listHeaderComponent:{
        backgroundColor:"rgba(48,49,51,1)",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    }
    
});