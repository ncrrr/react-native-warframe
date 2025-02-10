import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {FlatList, View} from "react-native";
import React, {useContext} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";


export const TeshinView = ({}) => {

    const {wfStats, getApiDatas } = useContext(DataHandlerContext)
    const {steelPath} = wfStats

    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>SteelPath Teshin</ThemedText>
            <View style={{padding: 10}}>
                <ThemedText>{steelPath?.currentReward.name} - {steelPath?.currentReward.cost} Steel Essences</ThemedText>
                <ThemedText>
                    <CustomTimer
                        targetDate={steelPath?.expiry}
                        updateDatas={getApiDatas}
                    />
                </ThemedText>
            </View>
        </ThemedView>
    );
}
