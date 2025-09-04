<ScrollView 
      style={styles.containerScroll}
      horizontal={true}
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