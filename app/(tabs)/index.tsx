import {Image, StyleSheet, Platform, RefreshControl} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {useCallback, useEffect, useState} from "react";
import {getWarframeStats} from "@/api/warframeStats";
import {AlertsView} from "@/components/home/AlertsView";
import {NewsView} from "@/components/home/NewsView";
import {EventsView} from "@/components/home/EventsView";
import {SortieView} from "@/components/home/SortieView";
import {BaroView} from "@/components/home/BaroView";
import {ThemedView} from "@/components/ThemedView";
import {EarthCycle} from "@/components/home/cycles/EarthCycle";
import {CetusCycle} from "@/components/home/cycles/CetusCycle";
import {CambionCycle} from "@/components/home/cycles/CambionCycle";
import {ZarimanCycle} from "@/components/home/cycles/ZarimanCycle";
import DatabaseManager from "@/database/DatabaseManager";
import {FissuresView} from "@/components/home/FissuresView";

export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false);
    const [apiData, setApiData] = useState({});

    useEffect(() => {
        getApiDatas()
    }, []);

    const getApiDatas = async () => {
        console.log('getApiDatas')
        const datas = await getWarframeStats();
        setApiData(datas)
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getApiDatas();
        setRefreshing(false);
    }, []);

    return (
        <ParallaxScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/warframe-icon.png')}
                    style={styles.reactLogo}
                />
            }>
            <BaroView voidTrader={apiData?.voidTrader}></BaroView>
            <ThemedView style={styles.parentCycles}>
                <ThemedView style={styles.childCycles}>
                    <EarthCycle earthCycle={apiData?.earthCycle}></EarthCycle>
                    <CetusCycle cetusCycle={apiData?.cetusCycle}></CetusCycle>
                </ThemedView>
                <ThemedView style={styles.childCycles}>
                    <CambionCycle cambionCycle={apiData?.cambionCycle}></CambionCycle>
                    <ZarimanCycle zarimanCycle={apiData?.zarimanCycle}></ZarimanCycle>
                </ThemedView>
            </ThemedView>
            <AlertsView alerts={apiData?.alerts}></AlertsView>
            <EventsView events={apiData?.events}></EventsView>
            <SortieView sortie={apiData?.sortie}></SortieView>
            <NewsView news={apiData?.news}></NewsView>
            {/* TODO: syndicate missions */}
            {/* TODO: fissures */}

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 200,
        width: 350,
        bottom: -40,
        left: -40,
        position: 'absolute',
    },
    parentCycles: {
        flexDirection: "column",
        gap: 10
    },
    childCycles: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-evenly"
    }
});
