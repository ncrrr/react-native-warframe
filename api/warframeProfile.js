import {AsyncStorage} from "expo-sqlite/kv-store";

export const getWarframeProfile = async () => {
    const username = await AsyncStorage.getItem('username');
    if(!username) return {}
    const response = await fetch(`https://api.warframestat.us/profile/${username}?language=fr`);
    return response.json();
}
