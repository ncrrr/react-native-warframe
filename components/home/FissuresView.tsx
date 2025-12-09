import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {Button, FlatList, Modal, ScrollView, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useContext, useState} from "react";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import CustomTimer from "@/components/ui/CustomTimer";
import {DataContext} from "@/types/context";
import {ThemedCard} from "@/components/ThemedCard";
import {ThemedSmallText} from "@/components/ThemedSmallText";


export const FissuresView = ({}) => {

    const [incomingFissuresModalOpen, setIncomingFissuresModalOpen] = useState(false)

    const customFissureFilter = (aFissure) => {
        return ( aFissure.tier === "Omnia" && aFissure.isHard) && ( aFissure.missionType.toLowerCase().includes('cascade') || aFissure.missionType.toLowerCase().includes('conjonction')) ||
            ( aFissure.isHard && ( aFissure.missionType.toLowerCase().includes('perturbation') || aFissure.missionType.toLowerCase().includes('conjonction')))
    }


    return (
        <DataHandlerContext.Consumer>
            {({wfStats, getApiDatas}: DataContext) => {
                console.log('RERENDER FISSURES VIEW', wfStats);
                const fissures: any[] = [] //wfStats?.fissures?.filter((f) => f.active) || [] //.filter(customFissureFilter) || []
                return (
                    <ThemedCard>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Fissures ({fissures?.length})</ThemedText>

                        {
                            fissures?.length >=1 ?
                                <FlatList
                                    data={fissures}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => (
                                        <ThemedView key={item.id} style={{justifyContent: 'space-between', margin: 10, backgroundColor: 'transparent'}}>
                                            <ThemedText style={{color: 'white'}}>{item.node} {item.isHard ? '- SP' : ''}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>{item.missionType} - {item.tier}</ThemedText>
                                            <ThemedText style={{color: 'white'}}>
                                                <CustomTimer
                                                    targetTime={item?.expiry}
                                                    refresh={getApiDatas}
                                                />
                                            </ThemedText>
                                        </ThemedView>
                                    )}
                                /> :
                                <ThemedSmallText>Aucune fissure interessantes :(</ThemedSmallText>

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
                                            fissures?.sort((a, b) => a.isHard - b.isHard)?.map((f) => (
                                                <ThemedView key={f.id} style={{justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: 'grey', backgroundColor: 'transparent'}}>
                                                    <ThemedText style={{color: 'white'}}>{f.node} {f.isHard ? '- SP' : ''}</ThemedText>
                                                    <ThemedText style={{color: 'white'}}>{f.missionType} - {f.tier}</ThemedText>
                                                    <ThemedText style={{color: 'white'}}>
                                                        <CustomTimer
                                                            targetTime={f?.expiry}
                                                            refresh={getApiDatas}
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
                    </ThemedCard>
                )
            }}
        </DataHandlerContext.Consumer>
    );
}
