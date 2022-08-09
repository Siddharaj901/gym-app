import React, { useState, useEffect, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { View, SafeAreaView, ImageBackground } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getPostById } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';
import HeaderGradient from '../components/HeaderGradient';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-htmlview';
import usePreferences from '../hooks/usePreferences';
import moment from 'moment';

export default function PostDetails(props) {

  const { route } = props;
  const { navigation } = props;
  const { id } = route.params;

  const {theme} = usePreferences();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
  
    props.navigation.setOptions({
      title: item.title,
      headerTitleStyle: { opacity: headerOpacity, color: 'white' },
      headerBackground: (props) => <HeaderGradient opacity={headerOpacity} {...props} />
    });
  
  }, [headerOpacity]);

  useEffect(() => {
    getPostById(id).then((response) => {
        setItem(response[0]);
        setIsLoaded(true);
    });
  }, []);


  if (!isLoaded) {

    return (
   
        <View style={{marginTop:50}}>
          <AppLoading/>
          </View>
   
         );
   
      }else{

 return (

<View style={{flex:1}}>

  <Animated.ScrollView
  onScroll={Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: yOffset,
          },
        },
      },
    ],
    { useNativeDriver: true }
  )}
  scrollEventThrottle={16}
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
    
<SafeAreaView>

    <View>

    <ImageBackground source={{uri: item.image}} style={Styles.Header2Image} resizeMode={'cover'}>
    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']} style={Styles.Header2Gradient}>

    <Text style={[Styles.Header2SubTitle, {fontSize: 14}]}>{moment(item.date).fromNow()}</Text>
    <Text style={Styles.Header2Title}>{item.title}</Text>
    <Text style={[Styles.Header2Category, {fontSize: 18, fontWeight:'bold'}]}>{item.tag}</Text>

    </LinearGradient>
    </ImageBackground>

    <View style={{marginTop:15, marginHorizontal:15}}>
    <HTMLView value={item.description} stylesheet={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
    </View>

    </View>
    </SafeAreaView>
    </Animated.ScrollView>

</View>

      );

}

}


