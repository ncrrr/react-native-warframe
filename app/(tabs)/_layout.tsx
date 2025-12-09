import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from "@expo/vector-icons/Ionicons";
import {FontAwesome5} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground, animation: 'shift',
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Accueil',
                tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
            }}
        />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Taches',
          tabBarIcon: ({ color }) => <FontAwesome5 size={25} name="tasks" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color }) => <Ionicons name="settings-sharp" size={25} color={color} />,
        }}
      />
    </Tabs>
  );
}
