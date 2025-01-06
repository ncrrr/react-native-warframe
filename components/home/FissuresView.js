import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {FlatList} from "react-native";


export const FissuresView = ({fissures}) => {
    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Alertes</ThemedText>

            {
                fissures?.length >=1 ?
                    <FlatList
                        data={fissures}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                <ThemedText style={{color: 'white'}}>{item.mission.node}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.mission.type}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.reward.asString}</ThemedText>
                            </ThemedView>
                        )}
                    /> :
                    <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune alerte</ThemedText>

            }
        </ThemedView>
    );
}