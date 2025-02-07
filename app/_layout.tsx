import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {getWarframeStats} from "@/api/warframeStats";
import {getWarframeProfile} from "@/api/warframeProfile";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [wfStats, setWfStats] = useState({});
  const [wfProfile, setWfProfile] = useState({});
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
  }, [loaded]);

  const getApiDatas = async () => {
    try {
      const wfDatas = await getWarframeStats();
      setWfStats(wfDatas)
    } catch(err) {
        console.log('Failed getting WF datas', err)
    }

    try {
      const wfProfileDatas = await getWarframeProfile();
      setWfProfile(wfProfileDatas)
    } catch(err) {
      console.log('Failed getting WF profile datas', err)
    }
  }

  if (!loaded) {
    return null;
  }

  return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <DataHandlerContext.Provider value={{wfStats, wfProfile, getApiDatas}}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          </DataHandlerContext.Provider>
        </ThemeProvider>
  );
}
