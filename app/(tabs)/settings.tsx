import {StyleSheet, Image, Platform, TextInput, FlatList, Button, View, TouchableOpacity} from 'react-native';

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
    const [lang, setLang] = React.useState('');

    useEffect(() => {
        (async () => {
            const aUsername = await AsyncStorage.getItem('username')
            setUsername(aUsername);

            const aLang = await AsyncStorage.getItem('lang')
            setLang(aLang);
        })()
    }, []);

    const handleUsernameChange = async (text: string) => {
        setUsername(text);
    }

    const handleUsernameSave = async () => {
        await AsyncStorage.setItem('username', username);
        await getApiDatas();
    }

    const handleLangChange = async (text: string) => {
        setLang(text);
    }

    const handleLangSave = async (aLang) => {
        setLang(aLang)
        await AsyncStorage.setItem('lang', aLang);
        setTimeout(async () => {
            await getApiDatas();
        }, 1000);
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
                <View style={styles.usernameBox}>
                    <TextInput style={styles.input} value={username} onChangeText={handleUsernameChange} placeholder={'Insert your Warframe username'}></TextInput>
                    <View>
                        {
                            !wfProfile?.displayName ?
                                <ThemedText style={{color: 'red'}}>KO</ThemedText> :
                                <ThemedText>{wfProfile?.displayName}</ThemedText>
                        }
                    </View>
                </View>
                <Button title={'Valider'} onPress={() => handleUsernameSave()}></Button>
            </ThemedView>
            <ThemedView>
                <ThemedText type={'subtitle'}>Language</ThemedText>
                <FlatList
                    data={[
                        { label: 'English', key: 'en' },
                        { label: 'Francais', key: 'fr' },
                        { label: 'Deutsch', key: 'de' },
                        { label: 'Italiano', key: 'it' },
                        { label: 'Español', key: 'es' },
                        { label: 'Português', key: 'pt' },
                        { label: 'Polski', key: 'pl' },
                        { label: 'Русский', key: 'ru' },
                        { label: '한국어', key: 'ko' },
                        { label: '简体中文', key: 'zh' },
                        {key: 'uk', label: 'Українська'},
                    ]}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.key} style={{
                            paddingVertical: 10, paddingHorizontal: 20, borderBottomColor: '#444', borderBottomWidth: 1, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                        }} onPress={() => handleLangSave(item.key)}>
                            <ThemedText>{item.label}</ThemedText>
                            {lang === item.key && <Ionicons color={'white'} name={'checkmark'} />}
                        </TouchableOpacity>
                    )} />
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
    },
    usernameBox: {flexDirection: 'row', justifyContent: 'space-between'}
});
