import {ThemedView} from "../ThemedView";
import {FlatList} from "react-native";
import {ThemedText} from "../ThemedText";
import CustomTimer from "@/components/ui/CustomTimer";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {ThemedCard} from "@/components/ThemedCard";
import {ThemedSmallText} from "@/components/ThemedSmallText";

export const AlertsView = ({}) => {

    return (
        <DataHandlerContext.Consumer>
            {({wfStats, getApiDatas}) => {
                const alerts = wfStats?.alerts || []
                return (
                    <ThemedCard>
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
                                                        targetTime={Number(item?.expiry)}
                                                        refresh={getApiDatas}
                                                    />
                                                    </ThemedText>

                                                </ThemedView>
                                                {item?.mission?.reward?.asString && <ThemedText style={{color: 'white'}}>{item?.mission?.reward?.asString}</ThemedText>}

                                            </ThemedView>
                                        </ThemedView>
                                    )}
                                /> :
                                <ThemedSmallText>Aucune alerte</ThemedSmallText>

                        }
                    </ThemedCard>
                )
            }}

        </DataHandlerContext.Consumer>
    );
}
