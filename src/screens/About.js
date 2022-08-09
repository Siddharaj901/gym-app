import React, { useState, useEffect } from 'react';
import { getStrings } from "../config/DataApp";
import { View, ScrollView, Image } from 'react-native';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-htmlview';
import AppLoading from '../components/InnerLoading';
import Styles from '../config/Styles';
import usePreferences from '../hooks/usePreferences';

export default function About() {

  const {theme} = usePreferences();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState('');

  useEffect(() => {

    getStrings().then((response) => {
      setItem(response[0]);
      setIsLoaded(true);
    });

  }, []);

  if (isLoaded) {

 return (

	<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <View style={Styles.PageScreen}>
    <Image source={theme === "dark" ? require('../../assets/logo-white.png') : require('../../assets/logo.png')} resizeMode={"contain"} style={Styles.PageLogo} />
    <HTMLView value={item.st_aboutus} stylesheet={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
    </View>
    </ScrollView>

      );

   }else{
   return (
     <AppLoading/>
     );
 }
 
}

