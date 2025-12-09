import {WarframeWorldState} from "@/types/api";
import Warframe from "warframe.js";
import {AsyncStorage} from "expo-sqlite/kv-store";


export const getWarframeInstance: () => Promise<WarframeWorldState> = async () => {

    /**
     * lang actually deprecated due the the current api not supporting lang parameter
     *
     *     let lang: string | null = null;
     *     if(await AsyncStorage.getItem('lang') !== null) {
     *         lang = await AsyncStorage.getItem('lang');
     *     }
     *     if (!lang) {
     *         lang = 'en';
     *     }
      */

    /*const currentTimeInMs: string = Date.now().toString();

    const response = await fetch('https://oracle.browse.wf/worldState.json?' + currentTimeInMs);*/

    const userPlatform: string | null = await AsyncStorage.getItem("platform");

    let options = {platform: userPlatform || "pc"};

    const WF = new Warframe(options);

    return WF;
}
