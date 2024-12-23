import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {FlatList} from "react-native";


export const BaroView = ({voidTrader}) => {
    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Baro Ki'Teer</ThemedText>

            {
                voidTrader?.inventory?.length >=1 ?
                    <FlatList
                        data={voidTrader.inventory}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <ThemedView style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', paddingBottom: 20, borderBottomColor: '#555', borderBottomWidth: 1}}>
                                <ThemedText style={{color: 'white'}}>{item.item}</ThemedText>
                                <ThemedText style={{color: 'white'}}>{item.ducats} ducats - {item.credits} crédits</ThemedText>
                            </ThemedView>
                        )}
                    /> :
                    <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Baro cones in {voidTrader?.startString}</ThemedText>

            }
        </ThemedView>
    );
}
