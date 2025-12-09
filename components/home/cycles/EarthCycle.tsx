import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomTimer from "@/components/ui/CustomTimer";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {ThemedCard} from "@/components/ThemedCard";

export const EarthCycle = ({}) => {
    const [earthCycle, setEarthCycle] =  useState({})

    const {wfInstance} = useContext(DataHandlerContext)

    useEffect(() => {
        console.log("items:", items);
        fetchEarthCycle()
    }, [])

    const fetchEarthCycle = async () => {
        try {
            const earthCycleData = await wfInstance.cycleEarth
            console.log('earthCycleData', earthCycleData)
            setEarthCycle(earthCycleData)
        } catch(e) {
            console.error('Error fetching earth cycle data:', e);
            setEarthCycle({})
        }
    }

    return (
        <ThemedCard style={{width: '49%', alignItems: 'center'}}>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Terre</ThemedText>
            {
                earthCycle?.isDay ?
                    <Ionicons name="sunny-sharp" size={35} color="orange" /> :
                    <Ionicons name="moon" size={35} color="white" />
            }
            {
                earthCycle?.expiry &&
                <ThemedText style={{color: 'white', textAlign: 'center'}}>
                    <CustomTimer
                        targetDate={earthCycle?.expiry}
                        updateDatas={getApiDatas}
                    ></CustomTimer>
                </ThemedText>
            }
        </ThemedCard>
    );
}
