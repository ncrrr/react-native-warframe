import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Button, FlatList} from "react-native";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";
import {ThemedCard} from "@/components/ThemedCard";


export const SortieView = ({}) => {

    const [sortie, setSortie] = useState({})
    const [expandList, setExpandList] = useState(false);

    const {wfInstance} = useContext(DataHandlerContext);

    useEffect(() => {
        fetchSortieData()
    }, []);

    const fetchSortieData = async () => {
        try {
            const sortieData = await wfInstance.sortie
            setSortie(sortieData)
        } catch (e) {
            console.error('Error fetching sortie data:', e);
            setSortie({})
        }
    }

    const toggleExpandList = () => {
        setExpandList(!expandList)
    }

    return (
        <ThemedCard style={{maxHeight: expandList ? null : 250}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Sortie</ThemedText>
            <ThemedView style={{margin: 10, backgroundColor: '#222'}}>
                <ThemedText type={'subtitle'}>Boss</ThemedText>
                <ThemedText>{sortie?.boss} - {sortie?.faction}</ThemedText>
                <ThemedText>Reset dans: <CustomTimer
                    targetTime={sortie?.expiry}
                    refresh={fetchSortieData}
                />
                </ThemedText>

            </ThemedView>

            {
                sortie?.variants?.length >=1 ?
                    <FlatList
                        style={{}}
                        scrollEnabled={false}
                        data={sortie.variants}
                        keyExtractor={(item) => item.node + item.nodeKey}
                        renderItem={({item}) => (
                            <ThemedView key={item.node + item.nodeKey} style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', borderBottomColor: '#555', borderBottomWidth: 1}}>
                                <ThemedText type={'subtitle'} style={{color: 'white'}}>{item.missionType}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.modifier}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.modifierDescription}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.node}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.tier}</ThemedText>
                            </ThemedView>
                        )}
                    /> :
                    <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune sortie</ThemedText>

            }
            <Button onPress={() => toggleExpandList()} title={expandList ? 'Cacher' : 'Afficher'}></Button>
        </ThemedCard>
    );
}
