import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomTimer from "@/components/ui/CustomTimer";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {ThemedCard} from "@/components/ThemedCard";


export const CetusCycle = ({}) => {
    const [cetusCycle, setCetusCycle] = useState({})

    const {wfInstance} = useContext(DataHandlerContext)

    useEffect(() => {
        fetchCetusCycle()
    }, [])


    const fetchCetusCycle = async () => {
        try {
            const cetusData = await wfInstance.cycleCetus
            setCetusCycle(cetusData)
        } catch (e) {
            console.error('Error fetching cetus cycle data:', e);
            setCetusCycle({})
        }
    }

    return (
        <ThemedCard style={{width: '49%', alignItems: 'center'}}>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Cetus</ThemedText>
            {
                cetusCycle?.isDay ?
                    <Ionicons name="sunny-sharp" size={35} color="orange" /> :
                    <Ionicons name="moon" size={35} color="white" />

            }
            {
                cetusCycle?.expiry &&
                <ThemedText style={{color: 'white', textAlign: 'center'}}>
                    <CustomTimer
                        targetTime={cetusCycle?.expiry}
                        refresh={fetchCetusCycle}
                    ></CustomTimer>
                </ThemedText>
            }
        </ThemedCard>
    );
}
