import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import * as Linking from 'expo-linking';
import {Button, FlatList, TouchableOpacity, StyleSheet, View, Image} from "react-native";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import PagerView, {usePagerView} from 'react-native-pager-view';

export const NewsView = ({}) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    let anInterval = null

    const { ref, ...rest } = usePagerView();

    useEffect(() => {
        anInterval = setInterval(() => {
            slideToNext(currentItemIndex)
        }, 2000)
        return () => {
            clearInterval(anInterval)
        }
    }, [currentItemIndex])

    const slideToNext = () => {
        let newIndex = 0
        if(currentItemIndex + 1 < ref.current.props?.children?.length) {
            newIndex = currentItemIndex + 1
        }
        ref.current.setPage(newIndex)
    }

    return (
        <DataHandlerContext.Consumer>
            {({wfStats2}) => {
                const {news} = wfStats2
                return (
                    <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700, paddingBottom: 10}}>Actualités ({news?.length})</ThemedText>
                        <PagerView
                            ref={ref}
                            style={styles.container}
                            onPageSelected={(e) => {
                                setCurrentItemIndex(e.nativeEvent.position)
                            }}
                        >
                            {
                                news?.length >=1 ?
                                    news?.sort((a, b) => new Date(b.Posted) - new Date(a.Posted)).map((item) => (
                                        <TouchableOpacity key={item.id} style={styles.page} onPress={() => Linking.openURL(item.URL)}>
                                            <ThemedView style={{position: 'relative', flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', width: '100%', height: 250}}>
                                                <View style={{flex: 1, padding: 10, borderRadius: 20, overflow: 'hidden'}}>
                                                    {
                                                        item.Image ?
                                                            <Image
                                                                source={{uri: item.Image}}
                                                                style={styles.test}
                                                                resizeMode={'cover'}
                                                            ></Image> :
                                                            <Image
                                                                source={require('@/assets/images/default-news-background.jpg')}
                                                                style={styles.test}
                                                                resizeMode={'cover'}
                                                            ></Image>
                                                    }
                                                    <View
                                                        style={[styles.test, {backgroundColor: 'black', opacity: 0.2}]}
                                                    ></View>
                                                    <View style={{position: 'absolute', bottom: 10, left: 10}}>
                                                        <ThemedText style={{color: 'white'}}>{item.Title}</ThemedText>
                                                        <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'transparent'}}>
                                                            <NewsTag type={item.IsEvent ? 'update' : null}></NewsTag>
                                                            <NewsTag type={item.Title?.includes('Prime Access') ? 'primeAccess' : null}></NewsTag>
                                                            <NewsTag type={item.LiveIndicator ? 'stream' : null}></NewsTag>
                                                            <ThemedText style={{color: '#999'}}>{new Date(item.Posted_ISO).toLocaleDateString()}</ThemedText>
                                                        </ThemedView>
                                                    </View>
                                                </View>
                                            </ThemedView>
                                        </TouchableOpacity>
                                    )) :
                                    <ThemedView style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', paddingBottom: 20, width: '90%'}}>
                                        <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune nouvelle</ThemedText>
                                    </ThemedView>
                            }
                        </PagerView>
                    </ThemedView>
                )
            }}
        </DataHandlerContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '250'
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    test: {
        position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, borderRadius: 20, objectFit: 'cover'
    }
});

const NewsTag = ({type}) => {
    const tagStyle = {color: 'white', paddingHorizontal: 10, paddingVertical: 1, borderRadius: 15}
    if(type === 'update') {
        return <ThemedText style={[tagStyle, {backgroundColor: 'darkgreen'}]}>MàJ</ThemedText>
    } else if (type === 'primeAccess') {
        return <ThemedText style={[tagStyle, {backgroundColor: 'darkorange'}]}>Prime</ThemedText>
    } else if(type === 'stream') {
        return <ThemedText style={[tagStyle, {backgroundColor: 'purple'}]}>Live</ThemedText>
    } else {
        return null
    }
}
