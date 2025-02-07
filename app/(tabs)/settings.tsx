import {StyleSheet, Image, Platform, TextInput, FlatList, Button} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useContext, useEffect} from "react";
import {AsyncStorage} from "expo-sqlite/kv-store";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";

export default function SettingsScreen() {
    const {wfStats, wfProfile, getApiDatas} = useContext(DataHandlerContext)

    const [username, setUsername] = React.useState('');

    useEffect(() => {
        (async () => {
            const username = await AsyncStorage.getItem('username')
            setUsername(username);
        })()
    }, []);

    const handleUsernameChange = async (text: string) => {
        setUsername(text);
    }

    const handleUsernameSave = async () => {
        await AsyncStorage.setItem('username', username);
        getApiDatas();
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Ionicons name="settings-sharp" size={310} color="#ff0000" style={styles.headerImage} />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Settings</ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText type={'subtitle'}>User profile</ThemedText>
                <TextInput style={styles.input} value={username} onChangeText={handleUsernameChange} placeholder={'Insert your Warframe username'}></TextInput>
                <Button title={'Valider'} onPress={() => handleUsernameSave()}></Button>
            </ThemedView>
            <ThemedView>
                <ThemedText type={'subtitle'}>Language</ThemedText>
                <FlatList
                    data={[
                        { label: 'English', key: 'en' },
                        { label: 'Francais', key: 'fr' },
                    ]}
                    renderItem={({ item }) => <ThemedText>{item.key}</ThemedText>} />
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -130,
        left: -55,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    input: {
        marginTop: 10,
        color: 'white'
    }
});
