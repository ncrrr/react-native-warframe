import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Button, FlatList} from "react-native";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";
import {ThemedCard} from "@/components/ThemedCard";
import {ThemedSmallText} from "@/components/ThemedSmallText";


export const ArchonHuntView = ({}) => {
    const [archonHunt, setArchonHunt] = useState<any>({});
    const [expandList, setExpandList] = useState(false);

    const {wfInstance} = useContext(DataHandlerContext);

    useEffect(() => {
        fetchArchonHuntData()
    }, [])

    const fetchArchonHuntData = async () => {
        try {
            const archonData = await wfInstance.archonHunt
            setArchonHunt(archonData)
        } catch (e) {
            console.error('Error fetching archon hunt data:', e);
            setArchonHunt({})
        }
    }

    const toggleExpandList = () => {
        setExpandList(!expandList)
    }

    return (
        <ThemedCard style={{maxHeight: expandList ? null : 250}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Archon Hunt</ThemedText>
            <ThemedView style={{margin: 10}}>
                <ThemedText type={'subtitle'}>Boss</ThemedText>
                <ThemedText>{archonHunt?.boss} - {archonHunt?.faction}</ThemedText>
                <ThemedText>Reset dans: <CustomTimer
                    targetTime={archonHunt?.expiry}
                    refresh={fetchArchonHuntData}
                />
                </ThemedText>

            </ThemedView>

            {
                archonHunt?.missions?.length >=1 ?
                    <FlatList
                        style={{}}
                        scrollEnabled={false}
                        data={archonHunt?.missions}
                        keyExtractor={(item) => item.nodeKey + item.typeKey}
                        renderItem={({item}) => (
                            <ThemedView key={item.nodeKey + item.typeKey} style={{flexDirection: 'column', justifyContent: 'space-between', padding: 10, backgroundColor: '#0000', borderBottomColor: '#555', borderBottomWidth: 1}}>
                                <ThemedText type={'subtitle'} style={{color: 'white'}}>{item.type} {item.archwingRequired ? '(Archwing)' : null}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.node}</ThemedText>
                            </ThemedView>
                        )}
                    /> :
                    <ThemedSmallText>Aucune sortie</ThemedSmallText>

            }
            <Button onPress={() => toggleExpandList()} title={expandList ? 'Cacher' : 'Afficher'}></Button>
        </ThemedCard>
    );
}
