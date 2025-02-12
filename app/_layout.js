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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [wfStats, setWfStats] = useState({});
  const [wfProfile, setWfProfile] = useState({});

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {

    (async () => {
      await getApiDatas();
    })()

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

    return () => {
      subscription.remove();
    };
  }, [loaded]);

  const getApiDatas = async () => {
    console.log("WILL PERFORM FETCH DATAS ...")
    try {
      const wfDatas = await getWarframeStats();
      setWfStatsContext(wfDatas)
    } catch(err) {
      console.log('Failed getting WF datas', err)
    }

    try {
      const wfProfileDatas = await getWarframeProfile();
      setWfProfileContext(wfProfileDatas)
    } catch(err) {
      console.log('Failed getting WF profile datas', err)
    }
  }

  const setWfStatsContext = useCallback((datas) => {
    setWfStats(datas)
  }, [wfStats, setWfStats])

  const setWfProfileContext = useCallback((datas) => {
    setWfProfile(datas)
  }, [wfProfile, setWfProfile])

  /*const getApiDatasContext = useCallback(async () => {
    await gatApiDatas()
  }, [getApiDatas])*/

  if (!loaded) {
    return (
        <ThemedView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
    );
  }

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <DataHandlerContext.Provider value={{wfStats, wfProfile, getApiDatas/*: getApiDatasContext*/}}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </DataHandlerContext.Provider>
      </ThemeProvider>
  );
}
