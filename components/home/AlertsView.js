import {ThemedView} from "../ThemedView";
import {FlatList} from "react-native";
import {ThemedText} from "../ThemedText";
import CustomTimer from "@/components/ui/CustomTimer";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {useContext} from "react";

export const AlertsView = ({}) => {

    return (
        <DataHandlerContext.Consumer>
            {({wfStats, updateDatas}) => {
                const {alerts} = wfStats
                return (
                    <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Alertes ({alerts?.length})</ThemedText>

                        {
                            alerts?.length >=1 ?
                                <FlatList
                                    data={alerts}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => (
                                        <ThemedView style={{margin: 10, backgroundColor: 'transparent', borderBottomColor: '#555', borderBottomWidth: 1, "paddingBottom": 20}}>
                                            <ThemedView style={{backgroundColor: 'transparent'}}>
                                                <ThemedText style={{color: 'white'}}>{item.mission.type}</ThemedText>
                                                <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
                                                    <ThemedText style={{color: 'white'}}>{item.mission.node} - <CustomTimer
                                                        targetDate={item?.expiry}
                                                        updateDatas={updateDatas}
                                                    ></CustomTimer>
                                                    </ThemedText>

                                                </ThemedView>
                                                {item?.mission?.reward?.asString && <ThemedText style={{color: 'white'}}>{item?.mission?.reward?.asString}</ThemedText>}

                                            </ThemedView>
                                        </ThemedView>
                                    )}
                                /> :
                                <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune alerte</ThemedText>

                        }
                    </ThemedView>
                )
            }}

        </DataHandlerContext.Consumer>
    );
}
