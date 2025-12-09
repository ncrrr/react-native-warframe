import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {FlatList, View} from "react-native";
import React, {useContext, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";
import {ThemedCard} from "@/components/ThemedCard";


export const TeshinView = ({}) => {

    const [steelPath, setSteelPath] = useState({});
    const {wfInstance } = useContext(DataHandlerContext)

    const fetchSteelPathData = async () => {
        try {
            //const stealPathData = await wfInstance.
        } catch (error) {
            console.error("Error fetching Steel Path data:", error);
            setSteelPath({});
        }
    }

    return (
        <ThemedCard>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>SteelPath Teshin</ThemedText>
            <View style={{padding: 10}}>
                <ThemedText>-</ThemedText>
            </View>
        </ThemedCard>
    )

    return (
        <ThemedCard>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>SteelPath Teshin</ThemedText>
            <View style={{padding: 10}}>
                <ThemedText>{steelPath?.currentReward.name} - {steelPath?.currentReward.cost} Steel Essences</ThemedText>
                <ThemedText>
                    <CustomTimer
                        targetDate={steelPath?.expiry}
                        updateDatas={fetchSteelPathData}
                    />
                </ThemedText>
            </View>
        </ThemedCard>
    );
}
