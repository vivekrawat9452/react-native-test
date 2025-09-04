import React,{useEffect,useState} from 'react';
import { Button, Text, View, StyleSheet,TouchableOpacity,Image, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';

function HomeScreen({  }) {
    const navigation= useNavigation();

    // const [products,setProducts]= useState([])
    const [laptop,setlaptop]= useState([])
    const [tv,setTv]= useState([])
    const [mobile,setMobile]= useState([])
    const [gaming,setGaming]= useState([])
    const [appliance,setappliance]= useState([])

   useEffect(()=>{
    
    fetch("https://fakestoreapi.in/api/products/category?type=gaming")
       .then(res => res.json())
       .then(res => setGaming(res.products.slice(0,10)));

       fetch("https://fakestoreapi.in/api/products/category?type=tv")
       .then(res => res.json())
       .then(res => setTv(res.products.slice(0,10)));

       fetch("https://fakestoreapi.in/api/products/category?type=mobile")
       .then(res => res.json())
       .then(res => setMobile(res.products.slice(0,10)));

       fetch("https://fakestoreapi.in/api/products/category?type=laptop")
       .then(res => res.json())
       .then(res => setlaptop(res.products.slice(0,10)))

       return ()=> {};
        // .then(res => console.log(res))
   },[])

   const handleClickItem=(item)=>{
    // navigation.navigate('Details',{state:item});
    navigation.navigate('Details', item)
    // {title: item.title, 
    //     image:item.image,
    //     price:item.price});
    // navigation.setParams({item})
    // navigation.navigate('Details')

   }

   const Products=({title,product})=>{


    return(
        <View style={styles.containerSub}>    
      <Text style={styles.title}>{title}</Text>
      <ScrollView 
      style={styles.containerScroll}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {product && product.map((item,index)=>(
        <View 
        key={item.id} 
        style={styles.items}>
            <TouchableOpacity onPress={()=>handleClickItem(item)}>
                <Image 
                style={styles.image}
                source={item.image}>
                </Image>
                
                <Text style={styles.textPrice}>Rs {item.price}</Text>                
                <Text style={styles.textDiscount}>{item.discount||0} % off</Text>
                {/* <Text style={styles.textPrice}>Rs {item.price}</Text> */}
                 <Text style={styles.textName}>{item.title}</Text>
            </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
      </View>

    );

   }

  return (
    <View style={styles.container}>

     <TouchableOpacity 
     style={styles.buttonCart}
     onPress={()=>navigation.navigate("Cart")}>
     cart
     </TouchableOpacity>   

     <ScrollView>

      <Products title={'Televison'} product={tv}/>
      <Products title={'Mobile'} product={mobile}/>
      <Products title={'Laptop'} product={laptop}/>
      <Products title={'Gaming'} product={gaming}/>
     </ScrollView>


    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    buttonCart:{
        width:80,
        height:30,
        backgroundColor:'gray',
        color:'white',
        fontSize:12,
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
        
    },
    containerScroll: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 6,
        backgroundColor: '#fff',
      },  

  image:{
    width:120,
    height:100
  },  
  items: {
    padding: 5,
    backgroundColor: 'white',
    width:200,
    height:200,
    flex:1,
    flexDirection:'row'

  },
  textPrice:{
    fontSize:12,
    fontWeight:'bold',
    // textDecorationStyle:'dashed'
  },
  textDiscount:{
    fontSize:14,
    // fontWeight:'bold',
  },
  textName:{
    fontSize:10,
    maxWidth:100
    // fontWeight:'bold',

  },
  containerSub: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    margin:5,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
});