import {View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import NseModule from '../../../NseModule';
import {NseData} from '../Home/nsedata';
import Lottie from 'lottie-react-native';
import styles from './style';
import ColorPalette from '../../../assests/ColorPalette';

// import {TouchableOpacity} from 'react-native-gesture-handler';

const MarketStatus = () => {
  const [nseData, setNseData] = useState<NseData>();
  useEffect(() => {
    {
      NseModule.onBridge('Init');
      setTimeout(() => {
        getNse();
      }, 1000);
    }
  }, []);

  const callbackSuccess = scanResult => {
    setNseData(JSON.parse(scanResult));
    console.log('losinggggJAVADDffd ' + scanResult);
  };
  const callbackError = error => {
    console.log('errorlosinggggJAVADDffd' + error);
  };
  const getNse = async () => {
    try {
      await NseModule.getAPIResponse(
        'https://www.nseindia.com/api/marketStatus',
        callbackSuccess,
        callbackError,
      );
    } catch (error) {
      console.error('testf ' + error);
    } finally {
    }
  };

  // console.log('nseData');
  // console.log(nseData);
  // console.log('marketdata');

  // Object.keys(nseData?.marketState || {}).map(key => {
  //   console.log(nseData?.marketState[key].market);
  // });

  return (
    <>
    
      <View

        style={{
          height: 285,
          backgroundColor: ColorPalette.textPurple,
          marginTop: 0,
        }}>
        <Lottie
          style={[styles.Logo]}
          source={require('../../../assests/lottie/market_status_logo.json')}
          autoPlay
          loop
        />
      </View>

      <View style={{backgroundColor: ColorPalette.textPurple}}>

        <View
          style={{
            backgroundColor: ColorPalette.textWhite,
            height: 40,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderRadius: 5,
          }}
        />
        <View style={{backgroundColor:ColorPalette.textWhite}}>
            <Text style={{color: ColorPalette.textBlack,fontSize:12,fontWeight:'500',marginLeft:20}}>Scroll Down For More >></Text>
        </View>
      </View>

      {nseData?.marketState && (
        <FlatList
          data={nseData?.marketState}

          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: ColorPalette.textWhite,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}>
              <Text style={{color: ColorPalette.textBlack}} />

              <View style={styles.marketItemContainer}>
                <Text style={styles.marketText}>
                  {item.market.toUpperCase()}
                </Text>

                <View style={styles.marketItemSubContainer}>
                  <View style={styles.tradeDateContainer}>
                    <Text style={styles.tradeText}>{item.tradeDate}</Text>
                  </View>
                  <Text style={styles.marketStatusText}>
                    {item.marketStatusMessage}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </>
  );
};
export default MarketStatus;
