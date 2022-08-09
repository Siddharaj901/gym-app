import React, { useState, useEffect, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { View, SafeAreaView, ImageBackground } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getDietById, removeDietBookmark, setDietBookmark } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, IconButton, Card } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderGradient from '../components/HeaderGradient';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-htmlview';
import usePreferences from '../hooks/usePreferences';

export default function DietDetails(props) {

  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;

  const {theme} = usePreferences();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookmark, setBookmark] = useState('');
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
      headerTitleStyle: { opacity: headerOpacity },
      headerBackground: (props) => <HeaderGradient opacity={headerOpacity} {...props} />
    });
  
  }, [headerOpacity]);

  const renderBookMark = async (id) => {
    await AsyncStorage.getItem('dietsFav').then(token => {
      const res = JSON.parse(token);
 
      if (res !== null) {
       let data = res.find(value => value.id === id);
 
       if (data !== null) {
         let data = res.find(value => value.id === id);
         return data == null ? setBookmark(false) : setBookmark(true);
       }
 
     } else {
       return false;
     }
 
   });
  };

  useEffect(() => {
    renderBookMark(id);
  }, []);

  const saveBookmark = (id, title, image) => {

    let data = {id, title, image};
    setBookmark(true);
    setDietBookmark(data).then(token => {
      if (token === true) {
        setBookmark(true);
      }
    });
    
  };
  
  const removeBookmark = (id) => {
    removeDietBookmark(id).then(token => {
     if (token === true) {
       setBookmark(false);
     }
     
   });
   
   };

  const renderButtonFav = () => {

    if (!isBookmark) {
        return (
          <IconButton icon="heart-outline" color={'white'} size={24} style={{marginRight: 15}} onPress={() => saveBookmark(item.id, item.title, item.image)}/>
          )
      }else{
        return (
          <IconButton icon="heart" color={"red"} size={24} style={{marginRight: 15}} onPress={() => removeBookmark(item.id)}/>
          )
        }
      }

      useEffect(() => {

        props.navigation.setOptions({
          title: title,
          headerTitleStyle: { opacity: headerOpacity, color: 'white' },
          headerRight: () => renderButtonFav(),
        });

      }, [isBookmark, item]);

  useEffect(() => {
    getDietById(id).then((response) => {
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
    <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={Styles.Header2Gradient}>

    <Text style={Styles.Header2Category}>{item.category}</Text>
    <Text style={Styles.Header2Title}>{item.title}</Text>
    <Text style={Styles.Header2SubTitle}>{Strings.ST93+' '+item.servings+' | '+Strings.ST94+' '+item.time}</Text>

    </LinearGradient>
    </ImageBackground>

    <Grid style={Styles.DietGrid}>

      <Col style={Styles.DietGridCol}>
      <Text style={Styles.DietGridTitle}>{item.calories}</Text>
      <Text style={Styles.DietGridSubTitle}>{Strings.ST117}</Text>
      </Col>

      <Col style={Styles.DietGridCol}>
      <Text style={Styles.DietGridTitle}>{item.protein}</Text>
      <Text style={Styles.DietGridSubTitle}>{Strings.ST118}</Text>
      </Col>

      <Col style={Styles.DietGridCol}>
      <Text style={Styles.DietGridTitle}>{item.fat}</Text>
      <Text style={Styles.DietGridSubTitle}>{Strings.ST119}</Text>
      </Col>

      <Col style={Styles.DietGridCol}>
      <Text style={Styles.DietGridTitle}>{item.carbs}</Text>
      <Text style={Styles.DietGridSubTitle}>{Strings.ST120}</Text>
      </Col>

    </Grid>

    <View style={{marginTop:15, marginHorizontal:15}}>
        <Card style={{marginBottom:15, borderWidth:0}} mode={'outlined'}>
            <Card.Title title={Strings.ST114} />
            <Card.Content>
            <HTMLView value={item.description} stylesheet={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
            </Card.Content>
        </Card>

        <Card style={{marginBottom:15, borderWidth:0}} mode={'outlined'}>
            <Card.Title title={Strings.ST115} />
            <Card.Content>
            <HTMLView value={item.ingredients} stylesheet={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
            </Card.Content>
        </Card>

        <Card style={{marginBottom:15, borderWidth:0}} mode={'outlined'}>
            <Card.Title title={Strings.ST116} />
            <Card.Content>
            <HTMLView value={item.instructions} stylesheet={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
            </Card.Content>
        </Card>

    </View>

    </View>
    </SafeAreaView>
    </Animated.ScrollView>

      );

}

}


