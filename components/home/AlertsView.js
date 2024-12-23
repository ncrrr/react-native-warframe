import {ThemedView} from "../ThemedView";
import {FlatList} from "react-native";
import {ThemedText} from "../ThemedText";

export const AlertsView = ({alerts}) => {
    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Alertes</ThemedText>

            {
                alerts?.length >=1 ?
                    <FlatList
                        data={alerts}
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
