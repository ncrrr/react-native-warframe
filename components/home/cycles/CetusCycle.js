import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import Timeframe from 'react-timeframe';
import CustomTimer from "@/components/ui/CustomTimer";


export const CetusCycle = ({cetusCycle, updateDatas}) => {
    return (
        <ThemedView style={{flex: 1,backgroundColor: '#222', borderRadius: 15, padding: 10, alignItems: 'center'}}>
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
                        targetDate={cetusCycle?.expiry}
                        updateDatas={updateDatas}
                    ></CustomTimer>
                </ThemedText>
            }
        </ThemedView>
    );
}
