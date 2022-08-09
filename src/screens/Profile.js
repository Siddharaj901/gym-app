import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, SafeAreaView } from 'react-native';
import AppLoading from '../components/InnerLoading';
import CustomButton from '../components/CustomButton';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import firebase from '../config/ConfigFirebase';
import { Text, IconButton } from 'react-native-paper';
import moment from 'moment';

export default function Profile(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState('');

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  const editButton = () => {
    return (
      <IconButton icon={"account-edit-outline"} style={{marginLeft:15}} size={24} onPress={() => onChangeScreen('editprofile')}/>
      )
  };

  useEffect(() => {

    const activeUser = firebase.auth().currentUser;
    setUser(activeUser);
    setIsLoaded(true);

  }, []);

  if (isLoaded) {

 return (

  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
  <SafeAreaView>
  <View style={Styles.HeaderProfile}>
    {user.photoURL ? <Image source={{uri: user.photoURL}} style={Styles.ImageProfile} resizeMode={"cover"}/>
    : <Image source={require('../../assets/male.jpg')} style={Styles.ImageProfile} resizeMode={"cover"}/>}
  
    <View style={{flexDirection: 'row'}}>
    <Text style={Styles.TextProfile}>{user.displayName ? user.displayName : '-'}</Text>
    {user.user_verified ? <Icon name="check-decagram" size={22} style={Styles.memberBadge}/> : null}
    </View>
  <Text style={Styles.SmallTextProfile}>{Strings.ST49}{moment(user.metadata.creationTime).fromNow()}</Text>
  </View>

  <View style={{marginHorizontal: 30, marginBottom: 40}}>
  <CustomButton Icon="dumbbell" Label={Strings.ST50} Click={() => onChangeScreen("customworkouts")}/>
  <CustomButton Icon="silverware-fork-knife" Label={Strings.ST51} Click={() => onChangeScreen("customdiets")}/>
  <CustomButton Icon="heart-outline" Label={Strings.ST4} Click={() => onChangeScreen("favorites")}/>
  <CustomButton Icon="bookmark-outline" Label={Strings.ST110} Click={() => onChangeScreen("about")}/>
  <CustomButton Icon="file-document-outline" Label={Strings.ST8} Click={() => onChangeScreen("terms")}/>
  <CustomButton Icon="logout" Label={Strings.ST9} Click={() => signOut()}/>

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

