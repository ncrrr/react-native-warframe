import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Button, FlatList, View} from "react-native";
import {useContext, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";


export const SortieView = ({}) => {

    const [expandList, setExpandList] = useState(false);

    const toggleExpandList = () => {
        setExpandList(!expandList)
    }

    return (
        <DataHandlerContext.Consumer>
            {({wfStats2, updateDatas}) => {
                const {sorties} = wfStats2
                return (
                    <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10, maxHeight: expandList ? null : 250}}>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Sortie</ThemedText>
                        <ThemedView style={{margin: 10, backgroundColor: '#222'}}>
                            <ThemedText type={'subtitle'}>Boss</ThemedText>
                            <ThemedText>{sorties?.Boss} - {sorties?.BossFaction}</ThemedText>
                            <ThemedText>Reset dans: <CustomTimer
                                targetDate={sorties?.Expires}
                            />
                            </ThemedText>

                        </ThemedView>

                        {
                            sorties?.Stages?.length >=1 ?
                                <FlatList
                                    style={{}}
                                    scrollEnabled={false}
                                    data={sorties.Stages}
                                    keyExtractor={(item) => item.MissionType + item.ModifierType}
                                    renderItem={({item}) => (
                                        <ThemedView key={item.MissionType + item.ModifierType} style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, paddingBottom: 20, backgroundColor: '#222', borderBottomColor: '#555', borderBottomWidth: 1}}>
                                            <ThemedText type={'subtitle'} style={{color: 'white'}}>{item.MissionType}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>{item.ModifierType}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>{item.ModifierDesc}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>{item.Location}</ThemedText>
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
