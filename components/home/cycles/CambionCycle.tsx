import {ThemedText} from "../../ThemedText";
import CustomTimer from "@/components/ui/CustomTimer";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {useContext} from "react";
import {ThemedCard} from "@/components/ThemedCard";


export const CambionCycle = ({}) => {
    const {wfStats, getApiDatas} = useContext(DataHandlerContext)

    const cambionCycle = wfStats?.cambionCycle || {}

    return (
        <ThemedCard>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Cambion</ThemedText>

            <ThemedText style={{color: 'white', textAlign: 'center', textTransform: 'capitalize'}}>{cambionCycle?.state}</ThemedText>
            {
                cambionCycle?.expiry &&
                <ThemedText style={{color: 'white', textAlign: 'center'}}>
                    <CustomTimer
                        targetTime={Number(cambionCycle?.expiry)}
                        refresh={getApiDatas}
                    ></CustomTimer>
                </ThemedText>
            }
        </ThemedCard>
    );
}
