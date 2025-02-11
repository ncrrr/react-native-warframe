import {AsyncStorage} from "expo-sqlite/kv-store";

export const getWarframeStats = async () => {
    let lang = 'fr';
    console.log(await AsyncStorage.getItem('lang'))
    if(await AsyncStorage.getItem('lang')) {
        lang = await AsyncStorage.getItem('lang');
    }
    const response = await fetch('https://api.warframestat.us/pc?language=' + lang);
    return response.json();
}
