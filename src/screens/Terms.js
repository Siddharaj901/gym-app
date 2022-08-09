import React, { useState, useEffect } from 'react';
import { getStrings } from "../config/DataApp";
import { View, ScrollView, SafeAreaView } from 'react-native';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-htmlview';
import Styles from '../config/Styles';
import AppLoading from '../components/InnerLoading';
import usePreferences from '../hooks/usePreferences';

export default function Terms() {

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
    <SafeAreaView>
    <View style={Styles.GuestPageScreen}>
    <HTMLView value={item.st_privacypolicy} stylesheet={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
    <HTMLView value={item.st_termsofservice} stylesheet={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
    </View>
    </SafeAreaView>
    </ScrollView>

      );

    }else{
   return (
     <AppLoading/>
     );
 }
 
}

