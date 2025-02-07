import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";
import Ionicons from '@expo/vector-icons/Ionicons';
import Timeframe from "react-timeframe";
import CustomTimer from "@/components/ui/CustomTimer";
import {useContext} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";

export const EarthCycle = ({}) => {
    const {wfStats, wfProfile, getApiDatas} = useContext(DataHandlerContext)

    const {earthCycle} = wfStats

    return (
        <ThemedView style={{flex: 1, backgroundColor: '#222', borderRadius: 15, padding: 10, alignItems: 'center'}}>
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
        </ThemedView>
    );
}
