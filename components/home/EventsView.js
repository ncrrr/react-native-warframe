import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {FlatList} from "react-native";
import CustomTimer from "@/components/ui/CustomTimer";
import {useContext} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";


export const EventsView = ({}) => {


    return (
        <DataHandlerContext.Consumer>
            {({wfStats, getApiDatas}) => {
                const {events} = wfStats
                return (
                    <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Événements ({events?.length})</ThemedText>
                        {
                            events?.length >=1 ?
                                <FlatList
                                    data={events.sort((a, b) => new Date(b.expiry) - new Date(a.expiry))}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => (
                                        <ThemedView style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', paddingBottom: 20, borderBottomColor: '#555', borderBottomWidth: 1}}>
                                            <ThemedText style={{color: 'white'}}>{item.asString}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>Expire dans: <CustomTimer
                                                targetDate={item?.expiry}
                                                updateDatas={getApiDatas}
                                            />
                                            </ThemedText>
                                        </ThemedView>
                                    )}
                                /> :
                                <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucun événement</ThemedText>
                        }
                    </ThemedView>
                )
            }}
        </DataHandlerContext.Consumer>
    );
}
