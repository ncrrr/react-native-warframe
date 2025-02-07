import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";
import Timeframe from "react-timeframe";
import CustomTimer from "@/components/ui/CustomTimer";


export const ZarimanCycle = ({zarimanCycle, updateDatas}) => {
    return (
        <ThemedView style={{flex: 1, backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Zariman</ThemedText>

            <ThemedText style={{color: 'white', textAlign: 'center', textTransform: 'capitalize'}}>{(zarimanCycle?.state || 'none')}</ThemedText>
            {
                zarimanCycle?.expiry &&
                <ThemedText style={{color: 'white', textAlign: 'center'}}>
                    <CustomTimer
                        targetDate={zarimanCycle?.expiry}
                        updateDatas={updateDatas}
                    ></CustomTimer>
                </ThemedText>
            }
        </ThemedView>
    );
}
