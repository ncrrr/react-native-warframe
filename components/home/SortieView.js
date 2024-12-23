import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Button, FlatList} from "react-native";
import {useState} from "react";


export const SortieView = ({sortie}) => {

    const [expandList, setExpandList] = useState(false);

    const toggleExpandList = () => {
        setExpandList(!expandList)
    }

    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10, maxHeight: expandList ? null : 250}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Sortie</ThemedText>
            <ThemedView style={{margin: 10, backgroundColor: '#222'}}>
                <ThemedText type={'subtitle'}>Boss</ThemedText>
                <ThemedText>{sortie?.boss} - {sortie?.boss}</ThemedText>

            </ThemedView>

            {
                sortie?.variants?.length >=1 ?
                    <FlatList
                        style={{}}
                        scrollEnabled={false}
                        data={sortie.variants}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <ThemedView style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', borderBottomColor: '#555', borderBottomWidth: 1}}>
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
        </ThemedView>
    );
}
