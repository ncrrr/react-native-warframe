import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import * as Linking from 'expo-linking';
import {Button, FlatList, TouchableOpacity, StyleSheet, View, Image} from "react-native";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import PagerView, {usePagerView} from 'react-native-pager-view';
import {DataContext} from "@/types/context";
import {ThemedCard} from "@/components/ThemedCard";
import {ThemedSmallText} from "@/components/ThemedSmallText";

export const NewsView = ({}) => {
    const [news, setNews] = useState<any[]>([])
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    let anInterval: number = 0

    const { ref, ...rest } = usePagerView();
    const {wfInstance}: DataContext = useContext(DataHandlerContext)

    // fetch data
    useEffect(() => {
        (async () => {
            try {
                const newsData = await wfInstance.news
                setNews(newsData)
            } catch(e) {
                console.error('Error fetching news data:', e);
                setNews([])
            }
        })()
    }, [])

    useEffect(() => {
        anInterval = setInterval(() => {
            slideToNext()
        }, 2000)
        return () => {
            clearInterval(anInterval)
        }
    }, [currentItemIndex])

    const slideToNext = () => {
        let newIndex = 0
        if(currentItemIndex + 1 < news?.length) {
            newIndex = currentItemIndex + 1
        }
        ref.current?.setPage(newIndex)
    }

    return (
        <DataHandlerContext.Consumer>
            {({wfStats}) => {
                const news = wfStats?.news || []
                return (
                    <ThemedCard>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700, paddingBottom: 10}}>Actualités ({news?.length || 0})</ThemedText>
                        <PagerView
                            ref={ref}
                            style={styles.container}
                            onPageSelected={(e) => {
                                setCurrentItemIndex(e.nativeEvent.position)
                            }}

                        >
                            {
                                news?.length >=1 ?
                                    news?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item) => (
                                        <TouchableOpacity key={item.id} style={styles.page} onPress={() => Linking.openURL(item.link)}>
                                            <View style={{position: 'relative', flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#0000', width: '100%', height: 250}}>
                                                <View style={{flex: 1, padding: 10, borderRadius: 100}}>
                                                    <Image
                                                        source={{uri: item.imageLink}}
                                                        style={styles.test}
                                                        resizeMode="cover"
                                                    ></Image>
                                                    <View
                                                        style={[styles.test, {backgroundColor: 'black', opacity: 0.2}]}
                                                    ></View>
                                                    <View style={{position: 'absolute', bottom: 10, left: 10}}>
                                                        <ThemedText style={{color: 'white'}}>{item.message}</ThemedText>
                                                        <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'transparent'}}>
                                                            <NewsTag type={item.update ? 'update' : null}></NewsTag>
                                                            <NewsTag type={item.primeAccess ? 'primeAccess' : null}></NewsTag>
                                                            <NewsTag type={item.stream ? 'stream' : null}></NewsTag>
                                                            <ThemedText style={{color: '#999'}}>{new Date(item.date).toLocaleDateString()}{item.primeAccess}</ThemedText>
                                                        </ThemedView>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )) :
                                    <ThemedView style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#0000', paddingBottom: 20, width: '90%'}}>
                                        <ThemedSmallText>Aucune nouvelle</ThemedSmallText>
                                    </ThemedView>
                            }
                        </PagerView>
                    </ThemedCard>
                )
            }}
        </DataHandlerContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 250,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    test: {
        position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, borderRadius: 20
    }
});

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
