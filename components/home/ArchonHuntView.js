import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Button, FlatList} from "react-native";
import {useContext, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";


export const ArchonHuntView = ({}) => {

    const [expandList, setExpandList] = useState(false);

    const toggleExpandList = () => {
        setExpandList(!expandList)
    }

    return (
        <DataHandlerContext.Consumer>
            {({wfStats, updateDatas}) => {
                const {archonHunt} = wfStats
                return (
                    <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10, maxHeight: expandList ? null : 250}}>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Archon Hunt</ThemedText>
                        <ThemedView style={{margin: 10, backgroundColor: '#222'}}>
                            <ThemedText type={'subtitle'}>Boss</ThemedText>
                            <ThemedText>{archonHunt?.boss} - {archonHunt?.faction}</ThemedText>
                            <ThemedText>Reset dans: <CustomTimer
                                targetDate={archonHunt?.expiry}
                                updateDatas={updateDatas}
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
                                        <ThemedView key={item.nodeKey + item.typeKey} style={{flexDirection: 'column', justifyContent: 'space-between', padding: 10, backgroundColor: '#222', borderBottomColor: '#555', borderBottomWidth: 1}}>
                                            <ThemedText type={'subtitle'} style={{color: 'white'}}>{item.type} {item.archwingRequired ? '(Archwing)' : null}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>{item.node}</ThemedText>
                                        </ThemedView>
                                    )}
                                /> :
                                <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune sortie</ThemedText>

                        }
                        <Button onPress={() => toggleExpandList()} title={expandList ? 'Cacher' : 'Afficher'}></Button>
                    </ThemedView>
                )
            }}
        </DataHandlerContext.Consumer>
    );
}
