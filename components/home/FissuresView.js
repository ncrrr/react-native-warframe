import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {Button, Dimensions, FlatList, Modal, SafeAreaView, ScrollView, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";


export const FissuresView = ({}) => {

    const [incomingFissuresModalOpen, setIncomingFissuresModalOpen] = useState(false)

    const {wfStats} = useContext(DataHandlerContext)

    const customFissureFilter = (aFissure) => {
        return ( aFissure.FissureType === "Omnia" && aFissure.IsSteelPath) ||
            ( aFissure.IsSteelPath && ( aFissure.MissionType.toLowerCase().includes('perturbation')))
    }


    return (
        <DataHandlerContext.Consumer>
            {({wfStats2, updateDatas}) => {
                const {fissures} = wfStats2
                return (

                    <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Fissures ({fissures?.length})</ThemedText>

                        {
                            fissures?.filter(customFissureFilter)?.length >=1 ?
                                <FlatList
                                    data={fissures?.filter(customFissureFilter)}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => (
                                        <ThemedView key={item.id} style={{justifyContent: 'space-between', margin: 10, backgroundColor: 'transparent'}}>
                                            <ThemedText style={{color: 'white'}}>{item.Location} {item.IsSteelPath ? '- SP' : ''}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>{item.MissionType} - {item.FissureType}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>
                                                <CustomTimer
                                                    targetDate={item?.EndTime}
                                                />
                                            </ThemedText>
                                        </ThemedView>
                                    )}
                                /> :
                                <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Aucune fissure interessantes :(</ThemedText>

                        }
                        {
                            fissures?.length >= 1 &&
                            <Button title={'Voir toutes les fissures'} onPress={() => setIncomingFissuresModalOpen(true)} />
                        }
                        <Modal
                            visible={incomingFissuresModalOpen}
                            onRequestClose={() => setIncomingFissuresModalOpen(false)}
                            transparent={true}
                            animationType={'slide'}
                        >
                            <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                                <ScrollView style={{}} contentContainerStyle={{alignItems: 'center', width: '100%'}}>
                                    <View style={{position: 'relative', padding: 10, backgroundColor: '#222', borderRadius: 20, width: '90%'}}>

                                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Fissures</ThemedText>
                                        {
                                            fissures?.sort((a, b) => a.IsSteelPath - b.IsSteelPath)?.map((f) => (
                                                <ThemedView key={f.id} style={{justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: 'grey', backgroundColor: 'transparent'}}>
                                                    <ThemedText style={{color: 'white'}}>{f.Location} {f.IsSteelPath ? '- SP' : ''}</ThemedText>
                                                    <ThemedText style={{color: 'white'}}>{f.MissionType} - {f.FissureType}</ThemedText>
                                                    <ThemedText style={{color: 'white'}}>
                                                        <CustomTimer
                                                            targetDate={f?.EndTime}
                                                        />
                                                    </ThemedText>
                                                </ThemedView>
                                            ))

                                        }
                                        <View style={{paddingTop: 10}}>
                                            <Button title={'FERMER'} onPress={() => setIncomingFissuresModalOpen(false)}>
                                            </Button>
                                        </View>
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        </Modal>
                    </ThemedView>
                )
            }}
        </DataHandlerContext.Consumer>
    );
}
