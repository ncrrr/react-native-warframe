import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {FlatList} from "react-native";
import {useContext} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";


export const FissuresView = ({}) => {

    const {wfStats} = useContext(DataHandlerContext)
    const {fissures} = wfStats

    const customFissureFilter = (aFissure) => {
        return aFissure.tier === "Omnia" && (
            aFissure.missionType.toLowerCase().includes('cascade') ||
            aFissure.missionType.toLowerCase().includes('conjonction') ||
            aFissure.missionType.toLowerCase().includes('disruption')
        )
    }

    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Fissures</ThemedText>

            {
                fissures?.filter(customFissureFilter)?.length >=1 ?
                    <FlatList
                        data={fissures?.filter(customFissureFilter)}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <ThemedView style={{justifyContent: 'space-between', margin: 10, backgroundColor: 'transparent'}}>
                                <ThemedText style={{color: 'white'}}>{item.node}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.missionType}</ThemedText>
                                <ThemedText style={{color: 'white'}}>
                                    <CustomTimer
                                        targetDate={item?.expiry}

                                    />
                                </ThemedText>
                            </ThemedView>
                        )}
                    /> :
                    <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune fissure interessantes :(</ThemedText>

            }
        </ThemedView>
    );
}
