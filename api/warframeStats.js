import {AsyncStorage} from "expo-sqlite/kv-store";

export const getWarframeStats = async () => {
    let lang = 'fr';
    if(await AsyncStorage.getItem('lang')) {
        lang = await AsyncStorage.getItem('lang');
    }
    const response = await fetch('https://api.warframestat.us/pc?language=' + lang);
    return response.json();
}

export const getWarframeStats2 = async () => {
    let lang = 'fr';
    if(await AsyncStorage.getItem('lang')) {
        lang = await AsyncStorage.getItem('lang');
    }
    const response = await fetch('https://ipeer.auron.co.uk/warframe/api/2/pc/realtime/');
    console.log("===", response.ok)
    if(response.ok) {
        return response.json();
    } else {
        throw new Error(response)
    }
}
