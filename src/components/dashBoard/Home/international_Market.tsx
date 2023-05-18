import {
    View,
    Text,
    FlatList,
    Button,
    Dimensions,
    Stylesheet,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
 
  import React, {useState} from 'react';
  import {useQuery} from 'react-query';
  import axios from 'axios';
  import Carousel from 'react-native-snap-carousel';
  import styles from './style';
  import {useNavigation} from '@react-navigation/native';
import ColorPalette from '../../../assests/ColorPalette';
 
  
  const fetchData = async () => {
    const response = await axios.get(
      'https://priceapi.moneycontrol.com/technicalCompanyData/globalMarket/getGlobalIndicesListingData?view=overview&deviceType=W',
    );
  
    // console.log(response.data.dataList);
  
    return response.data.dataList;
    
  };
  
  const Index_one = () => {
    const navigation = useNavigation();
    const {data, error, isLoading} = useQuery('nse', fetchData);
  
    if (isLoading) {
      return <Text style={{color: ColorPalette.textBlack}}>Please Wait, Fetching Data...</Text>;
    }
    if (error) {
      return <Text style={{color: ColorPalette.textBlack}}>{error.message}</Text>;
    }
  
    const width = Dimensions.get('window').width;
  
    return (
     
        <View style={styles.crouselContainer}>
          <View style={{flexDirection:'row',}}>
          <Text style={{color:"black",marginLeft:15,fontSize:15,fontWeight:'700',}} >International Market Price ></Text>
          </View>
  
          <Carousel
            styles={styles.Crousel}
            data={data}
            renderItem={({item}) => (
              <View style={styles.renderItemContainer}>
                  <Text style={styles.renderItemText}>
                    {item.heading.replace('_', ' ')}
                  </Text>
  
                  <View style={{flexDirection:'row',justifyContent:"space-between",marginHorizontal:55,marginTop:0}}>
                  <Text style={styles.renderItemSubText}>{item.data[1][0]}</Text>
                  <Text style={styles.renderItemSubText}>{item.data[1][2]}</Text>
                  </View>
  
                  <View  style={{flexDirection:'row',justifyContent:"space-between",marginHorizontal:55,marginBottom:0}}>
                  <Text style={styles.renderItemSubText}>{item.data[1][1]}</Text>
                  <Text style={styles.renderItemSubText}>{item.data[2][2]}</Text>
                  </View>
              
              </View>
            )}
            sliderWidth={362}
            itemWidth={275}
            loop={true}
          />
        </View>
    
    );
  };
  

  export default Index_one;
  
  