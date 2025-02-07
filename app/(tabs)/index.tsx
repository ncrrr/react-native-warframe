import {Image, StyleSheet, Platform, RefreshControl, SafeAreaView} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {useCallback, useContext, useEffect, useState} from "react";
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
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {ThemedText} from "@/components/ThemedText";

export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false);
    const {wfStats, wfProfile, getApiDatas} = useContext(DataHandlerContext)

    console.log(wfProfile)


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
                <>
                    <Image
                        source={require('@/assets/images/warframe-icon.png')}
                        style={styles.reactLogo}
                    />
                    {wfProfile?.displayName && <ThemedView style={styles.userInfos}>
                        <ThemedText style={styles.masteryRank}>{wfProfile?.displayName?.slice(0, -1)}</ThemedText>
                        <ThemedText style={styles.masteryRank}>MR {wfProfile?.masteryRank}</ThemedText>
                    </ThemedView>}
                </>
            }>
            <BaroView voidTrader={wfStats?.voidTrader}></BaroView>
            <ThemedView style={styles.parentCycles}>
                <ThemedView style={styles.childCycles}>
                    <EarthCycle updateDatas={getApiDatas} earthCycle={wfStats?.earthCycle}></EarthCycle>
                    <CetusCycle updateDatas={getApiDatas} cetusCycle={wfStats?.cetusCycle}></CetusCycle>
                </ThemedView>
                <ThemedView style={styles.childCycles}>
                    <CambionCycle updateDatas={getApiDatas} cambionCycle={wfStats?.cambionCycle}></CambionCycle>
                    <ZarimanCycle updateDatas={getApiDatas} zarimanCycle={wfStats?.zarimanCycle}></ZarimanCycle>
                </ThemedView>
            </ThemedView>
            <AlertsView alerts={wfStats?.alerts} updateDatas={getApiDatas}></AlertsView>
            <EventsView events={wfStats?.events}></EventsView>
            <SortieView sortie={wfStats?.sortie}></SortieView>
            <NewsView news={wfStats?.news}></NewsView>
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
    },
    masteryRank: {
        fontSize: 20,
        color: 'white',
        textAlign: 'right'
    },
    userInfos: {
        position: 'absolute',
        top: 50,
        right: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 5
    }
});
