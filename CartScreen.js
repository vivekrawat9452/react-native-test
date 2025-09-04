import React,{useEffect,useState} from "react";
import { View,StyleSheet,Button, ScrollView ,Image,Text,TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen=()=>{
    const [items, setItems]= useState([]);

    useEffect(()=>{
        const getAllItems=async()=>{
            
            const keys = await AsyncStorage.getAllKeys();
            const res=[];
            for(let key of keys){
                const item1= await AsyncStorage.getItem(key);
                res.push(JSON.parse(item1));
            }
            setItems(res);
            console.log('items_cart',res)
            console.log('keys',keys)

        }
        getAllItems();

        
    },[]);

    const handleCartClear=async()=>{
        await AsyncStorage.clear();
    }

    const handleRemove=async(id)=>{
        await AsyncStorage.removeItem(id);
    }
    
    
    return(
        <View styles={styles.container}>
            <Button title="clear cart" onPress={() => handleCartClear()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                {
                    items && items.map((item,index)=>(
                <View key={item.id} style={styles.row}>
                <Image 
                style={styles.image}
                source={item.image}>
                </Image>
                
                <View style={styles.container}>
                <Text style={styles.textPrice}>Rs {item.price}</Text>                
                <Text style={styles.textDiscount}>{item.discount} % off</Text>
                <Text style={styles.textName}>{item.title}</Text>

                 </View>
                 <TouchableOpacity 
                style={styles.buttonRem} 
                onPress={()=>handleRemove(item.id)}>
                remove</TouchableOpacity>

                </View>
                ))
                }
                </View>

                <View>

                </View>
            </ScrollView>
        </View>
    );
}

export default CartScreen;

const styles= StyleSheet.create({
    row:{
        flexDirection:'row',
        marginHorizontal:30,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonRem:{
        width:50,
        height:20,
        backgroundColor:'red',
        color:'black',
        fontSize:12,
        alignItems:'center',
        justifyContent:'center'
        
    },
    image:{
        width:60,
        height:60
      }, 
      textPrice:{
        fontSize:10,
        fontWeight:'bold',
        // textDecorationStyle:'dashed'
      },
      textDiscount:{
        fontSize:10,
        // fontWeight:'bold',
      },
      textName:{
        fontSize:8,
        // fontWeight:'bold',
    
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
      },
});