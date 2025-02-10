import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {Button, FlatList} from "react-native";
import Timeframe from "react-timeframe";
import {useContext, useState} from "react";
import CustomTimer from "@/components/ui/CustomTimer";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";


export const BaroView = ({}) => {

    const {wfStats, wfProfile, getApiDatas} = useContext(DataHandlerContext)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const {voidTrader} = wfStats

    return (
        <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Baro Ki'Teer</ThemedText>

            {
                voidTrader?.inventory?.length >=1 ?
                    <>

                        <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Termine dans: <CustomTimer
                                targetDate={voidTrader?.expiry}
                                updateDatas={getApiDatas}
                            ></CustomTimer>
                        </ThemedText>
                        <FlatList
                            data={voidTrader.inventory}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <ThemedView style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10, backgroundColor: '#222', paddingBottom: 20, borderBottomColor: '#555', borderBottomWidth: 1}}>
                                    <ThemedText style={{color: 'white'}}>{item.item}</ThemedText>
                                    <ThemedText style={{color: 'white'}}>{item.ducats} ducats - {item.credits} crédits</ThemedText>
                                </ThemedView>
                            )}
                        />
                    </> :
                    <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Ouvre dans: <CustomTimer
                            targetDate={voidTrader?.activation}
                            updateDatas={getApiDatas}
                        ></CustomTimer>
                    </ThemedText>

            }
            {
                // only show this button if the trader is active
                voidTrader.active && <Button onPress={() => toggleModalOpen()} title={isModalOpen ? 'Cacher' : 'Afficher'}></Button>
            }
        </ThemedView>
    );
}
