import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";
import CustomTimer from "@/components/ui/CustomTimer";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {ThemedCard} from "@/components/ThemedCard";


export const ZarimanCycle = ({}) => {
    const [zarimanCycle, setZarimanCycle] = useState({})
    const {wfInstance} = useContext(DataHandlerContext)

    useEffect(() => {
        fetchZarimanCycle()
    }, []);

    const fetchZarimanCycle = async () => {
        try {
            const zarimanData = await wfInstance.zarimanCycle
            setZarimanCycle(zarimanData)
        } catch (e) {
            console.error('Error fetching zariman cycle data:', e);
            setZarimanCycle({})
        }
    }

    return (
        <ThemedCard style={{textAlign: 'center'}}>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Zariman</ThemedText>

            <ThemedText style={{color: 'white', textAlign: 'center', textTransform: 'capitalize'}}>{(zarimanCycle?.state || 'none')}</ThemedText>
            {
                zarimanCycle?.expiry &&
                <ThemedText style={{color: 'white', textAlign: 'center'}}>
                    <CustomTimer
                        targetTime={zarimanCycle?.expiry}
                        refresh={fetchZarimanCycle}
                    ></CustomTimer>
                </ThemedText>
            }
        </ThemedCard>
    );
}
