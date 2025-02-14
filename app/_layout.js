import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useCallback, useEffect, useRef, useState} from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {getWarframeStats} from "@/api/warframeStats";
import {getWarframeProfile} from "@/api/warframeProfile";
import {AppState, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {getWarframeStats2} from "../api/warframeStats";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
let apiRefreshInterval
const apiRefreshIntervalTime = 1000 * 30 // 30 sec

export default function RootLayout() {
  const [wfStats, setWfStats] = useState({});
  const [wfStats2, setWfStats2] = useState({});
  const [wfProfile, setWfProfile] = useState({});
  const [isApiLoading, setIsApiLoading] = useState(true);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {

    if (loaded) {
      SplashScreen.hideAsync();
    }
    console.log('RootLayout useEffect')

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        getApiDatas()
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    getApiDatas();


    apiRefreshInterval = setInterval(async () => {
      console.log('API REFRESH INTERVAL')
      await getApiDatas();
    }, apiRefreshIntervalTime)

    return () => {
      subscription.remove();
      clearInterval(apiRefreshInterval)
    };
  }, []);

  const getApiDatas = async () => {
    console.log("WILL PERFORM FETCH DATAS ...")

    try {
      const wfDatas = await getWarframeStats2();
      setWfStats2(wfDatas)
    } catch(err) {
      console.log('Failed getting WF profile datas', err)
    }
    console.log('END API CALLS')
    setIsApiLoading(false)
  }

  const setWfStatsContext = useCallback((datas) => {
    setWfStats(datas)
  }, [wfStats, setWfStats])

  const setWfStatsContext2 = useCallback((datas) => {
    setWfStats2(datas)
  }, [wfStats2, setWfStats2])

  const setWfProfileContext = useCallback((datas) => {
    setWfProfile(datas)
  }, [wfProfile, setWfProfile])


  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <DataHandlerContext.Provider value={{wfStats, wfStats2, wfProfile, getApiDatas}}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </DataHandlerContext.Provider>
      </ThemeProvider>
  );
}
