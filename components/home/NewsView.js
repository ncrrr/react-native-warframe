import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import * as Linking from 'expo-linking';
import {Button, FlatList, TouchableOpacity} from "react-native";
import {useState} from "react";


export const NewsView = ({news}) => {
    const [expandList, setExpandList] = useState(false);

    const toggleExpandList = () => {
        setExpandList(!expandList)
    }

    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700, paddingBottom: 10}}>Actualités ({news?.length})</ThemedText>

            {
                news?.length >=1 ?
                    <FlatList
                        scrollEnabled={false}
                        style={{maxHeight: expandList ? null : 200}}
                        data={news.sort((a, b) => new Date(b.date) - new Date(a.date))}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                                <ThemedView style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', paddingBottom: 20, borderBottomColor: '#555', borderBottomWidth: 1}}>
                                    <ThemedText style={{color: 'white'}}>{item.message}</ThemedText>
                                    <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#222'}}>
                                        <NewsTag type={item.update ? 'update' : null}></NewsTag>
                                        <NewsTag type={item.primeAccess ? 'primeAccess' : null}></NewsTag>
                                        <NewsTag type={item.stream ? 'stream' : null}></NewsTag>
                                        <ThemedText style={{color: '#999'}}>{new Date(item.date).toLocaleDateString()}{item.primeAccess}</ThemedText>
                                    </ThemedView>
                                </ThemedView>
                            </TouchableOpacity>
                        )}
                    /> :
                    <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune nouvelle</ThemedText>

            }
            <Button onPress={() => toggleExpandList()} title={expandList ? 'Cacher' : 'Afficher'}></Button>
        </ThemedView>
    );
}


const NewsTag = ({type}) => {
    const tagStyle = {color: 'white', paddingHorizontal: 10, paddingVertical: 1, borderRadius: 15}
    if(type === 'update') {
        return <ThemedText style={[tagStyle, {backgroundColor: 'darkgreen'}]}>MàJ</ThemedText>
    } else if (type === 'primeAccess') {
        return <ThemedText style={[tagStyle, {backgroundColor: 'darkorange'}]}>Prime</ThemedText>
    } else if(type === 'stream') {
        return <ThemedText style={[tagStyle, {backgroundColor: 'purple'}]}>Stream</ThemedText>
    } else {
        return null
    }
}
