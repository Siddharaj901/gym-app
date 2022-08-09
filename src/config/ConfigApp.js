//////////////////// CONFIG APP

import Constants from 'expo-constants';

const isStandAloneApp = Constants.appOwnership == "standalone";

const ConfigApp = {

    // backend url (with slash at end)
    URL: "https://wicombit.com/demo/fitpro/",

    DEFAULTLANG: "en",

    THEMEMODE: "light", // light or dark

    // android banner admob unit id
    ANDROID_BANNER_ID: "ca-app-pub-4232853679195184/9960468155",

    // android interstitial admob unit id
    ANDROID_INTERSTITIAL_ID: "ca-app-pub-4232853679195184/6021223149",

    // ios banner admob unit id
    IOS_BANNER_ID: "ca-app-pub-4232853679195184/6490312229",

    // ios interstitial admob unit id
    IOS_INTERSTITIAL_ID: "ca-app-pub-4232853679195184/8822344987",
    
    // testdevice id, DON'T CHANGE IT
    TESTDEVICE_ID : isStandAloneApp ? "EMULATOR" : "EMULATOR"

};

export default ConfigApp;