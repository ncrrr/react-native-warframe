import {Image, StyleSheet, Platform, RefreshControl, SafeAreaView} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {useCallback, useContext, useEffect, useState} from "react";
import {getWarframeStats} from "@/api/warframeWorldState";
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
import {TeshinView} from "@/components/home/TeshinView";
import {ArchonHuntView} from "@/components/home/ArchonHuntView";
import {DataContext} from "@/types/context";

export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // we will emit a refresh event for the all the customTimers
        const refreshEvent = new Event('refreshTimers');
        window.dispatchEvent(refreshEvent);
        await setTimeout(() => {}, 1000); // wait for 1 second to simulate data fetching

        setRefreshing(false);
    }, []);

    return (
        <ParallaxScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ flex: 1 }}
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <>
                    <Image
                        source={require('@/assets/images/warframe-icon.png')}
                        style={styles.reactLogo}
                    />
                    {/*wfProfile?.displayName && <ThemedView style={styles.userInfos}>
                        <ThemedText style={styles.masteryRank}>{wfProfile?.displayName?.slice(0, -1)}</ThemedText>
                        <ThemedText style={styles.masteryRank}>MR {wfProfile?.masteryRank}</ThemedText>
                    </ThemedView>*/}
                </>
            }>
            <NewsView></NewsView>
            <BaroView></BaroView>
            <ThemedView style={styles.parentCycles}>
                <ThemedView style={styles.childCycles}>
                    <EarthCycle></EarthCycle>
                    <CetusCycle></CetusCycle>
                </ThemedView>
                <ThemedView style={styles.childCycles}>
                    <CambionCycle></CambionCycle>
                    <ZarimanCycle></ZarimanCycle>
                </ThemedView>
            </ThemedView>
            <AlertsView></AlertsView>
            <EventsView></EventsView>
            <SortieView></SortieView>
            <ArchonHuntView></ArchonHuntView>
            {/* TODO: syndicate missions */}
            {/* TODO: fissures */}
            <FissuresView></FissuresView>
            <TeshinView></TeshinView>

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
