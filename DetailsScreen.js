import * as React from 'react';
import { Button, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";


function DetailsScreen({ route }) {
  const navigation= useNavigation();
  const { id,title,image,price,
  color ,brand,modal,
  description,discount} = route.params;

  const windowWidth = Dimensions.get('window').width* 0.4;
  const windowHeight = Dimensions.get('window').height* 0.8;

  // const width=Dimensions.get('window').width;
  // localStorage.setItem()
  

  const handleCartAdd=async()=>{
    const str= JSON.stringify({id,title,image,price,discount}) ;
    await AsyncStorage.setItem(id,str);

    navigation.navigate("Cart");
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.titleSmall}>{title||'null'}</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.row}>

      <View style={styles.containerSub}>  
      <Image 
      style={{width:windowWidth,height:windowHeight,resizeMode:'contain'}}
      // style={styles.image}
      source={image}/>
      </View>

      <View style={styles.containerSub}>
      <Text style={styles.title}>{title||''}</Text>
      <Text style={styles.title}>Rs {price||''}</Text>
      <Text style={styles.titleSmall}> {description||''}</Text>

      <View>
      <Text style={styles.titleMed}>Highlights</Text>
      <Text style={styles.titleMed}>brand  {brand||'n/a'}</Text>
      <Text style={styles.titleMed}>modal  {modal||'n/a'}</Text>
      <Text style={styles.titleMed}>color  {color||'n/a'}</Text>
      </View>

      </View>

      </View>
      </ScrollView>
      <Button title="Add to cart" onPress={() => handleCartAdd()} />
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  // image:{
  //   flex:1,
  //   width:width,
  //   height:'100',
  // }, 
  row:{
    flexDirection:'row'
  }, 
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 6,
    backgroundColor: '#fff',
  },
  containerSub: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // padding: 16,
    backgroundColor: '#fff',
  },
  titleSmall: {
    fontSize: 14,
    // fontWeight: '600',
    marginBottom: 16,
  },
  titleMed: {
    fontSize: 16,
    // fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
});
