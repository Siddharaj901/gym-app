import React from 'react';
import { ImageBackground, View, Dimensions, I18nManager } from 'react-native';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import hexToRgba from 'hex-to-rgba';
import {map} from 'lodash';
import ColorsApp from '../config/ColorsApp';
import { Button, IconButton, RadioButton, Dialog, Portal, Text } from 'react-native-paper';
import * as Updates from 'expo-updates';
import CustomModal from '../components/CustomModal';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function Start(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  let languageNames = Object.values(Languages);
  languageNames = languageNames.map((l) => { return { label: l.label, value: l.value } })

  const toggleLanguage = (selectedLanguage) => {

    if (selectedLanguage === "ar") {
      I18nManager.forceRTL(true)
    }
    else {
      I18nManager.forceRTL(false)
    }
    contextState.updateValue(selectedLanguage);

    setVisible(false);
    showModal(true);

    setTimeout(() => {
      Updates.reloadAsync();
    }, 1000);

  }

  const [modal, showModal] = React.useState(false); 
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
};

const buttonBack = () => {
	return (
		<IconButton icon={"translate"} color='white' style={{marginLeft:15}} size={24} onPress={showDialog}/>
		)
};

React.useEffect(() => {

  props.navigation.setOptions({
    headerRight: () => buttonBack(),
  });

}, []);

 return (
    
    <ImageBackground source={require('../../assets/bg.jpg')} style={{flex: 1, width:'100%'}}>
    <LinearGradient colors={[hexToRgba(ColorsApp.PRIMARY, '0.1'), 'rgba(0,0,0,1)']} style={{height: screenHeight/1.2, position:'absolute', top: 0, lef: 0, right: 0, width:'100%'}}></LinearGradient>
    <View style={{flex: 1, alignItems:'flex-start', justifyContent:'center'}}>

    <View style={{width: '80%', marginHorizontal: 40}}>
    <Text style={{color: 'white', fontSize: 20, fontWeight:'300', marginBottom: 5}}>{Strings.ST163}</Text>
    <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>{Strings.ST164}</Text>
    <View style={{height: 6, width: 60, backgroundColor: ColorsApp.PRIMARY, marginTop: 15}}></View>
    <Text style={{color: 'white', fontSize: 20, fontWeight:'300', marginTop: 15}}>{Strings.ST165}</Text>
    </View>

    </View>

    <Button theme={{ roundness: 30 }} style={{elevation:0, margin: 40}} labelStyle={{letterSpacing:0, fontSize:18, fontWeight: 'bold'}} contentStyle={{paddingVertical: 7, elevation: 0}} mode="contained" onPress={() => onChangeScreen('login')}>
    {Strings.ST166}
    </Button>

    <CustomModal isVisible={modal} modalText={Strings.ST31} showIndicator={true}/>

    <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{Strings.ST109}</Dialog.Title>
            <Dialog.Content>
            <RadioButton.Group onValueChange={value => value !== language ? toggleLanguage(value) : null} value={language}>
            {map(languageNames, (item, index) => (
              <RadioButton.Item mode="android" key={index} label={item.label} value={item.value} />
              ))}
            </RadioButton.Group>
            </Dialog.Content>
          </Dialog>
        </Portal>

    </ImageBackground>

      );
}

