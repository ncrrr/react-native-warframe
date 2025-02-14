import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {Button, FlatList} from "react-native";
import Timeframe from "react-timeframe";
import {useContext, useState} from "react";
import CustomTimer from "@/components/ui/CustomTimer";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";

const newDate = new Date();
export const BaroView = ({}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }


    return (
        <DataHandlerContext.Consumer>
            {({wfStats2, getApiDatas}) => {
                console.log(wfStats2)
                const {void_traders} = wfStats2
                if(!void_traders) return null
                let voidTrader = void_traders[0]
                return (
                    <ThemedView style={{backgroundColor: '#222', borderRadius: 15, padding: 10}}>
                        <ThemedText type={'title'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Baro Ki'Teer</ThemedText>
                        {
                            voidTrader?.inventory?.length >= 1 ?
                                <>
                                    <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Termine
                                        dans: <CustomTimer
                                            targetDate={voidTrader?.Departure}
                                        />
                                    </ThemedText>
                                    <FlatList
                                        data={voidTrader.inventory}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({item}) => (
                                            <ThemedView style={{
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                margin: 10,
                                                backgroundColor: '#222',
                                                paddingBottom: 20,
                                                borderBottomColor: '#555',
                                                borderBottomWidth: 1
                                            }}>
                                                <ThemedText style={{color: 'white'}}>{item.item}</ThemedText>
                                                <ThemedText style={{color: 'white'}}>{item.ducats} ducats
                                                    - {item.credits} crédits</ThemedText>
                                            </ThemedView>
                                        )}
                                    />
                                    <Button onPress={() => toggleModalOpen()}
                                            title={isModalOpen ? 'Cacher' : 'Afficher'}></Button>
                                </> :
                                <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey'}}>Ouvre
                                    dans: <CustomTimer
                                        targetDate={voidTrader?.Arrival}
                                    />
                                </ThemedText>
                        }
                    </ThemedView>
                )
            }}
        </DataHandlerContext.Consumer>
    );
}
