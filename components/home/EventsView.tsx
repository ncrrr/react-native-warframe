import {ThemedView} from "../ThemedView";
import {ThemedText} from "../ThemedText";
import {FlatList} from "react-native";
import CustomTimer from "@/components/ui/CustomTimer";
import {DataHandlerContext} from "@/contexts/DataHandlerContext";
import {useContext, useEffect, useState} from "react";
import {ThemedCard} from "@/components/ThemedCard";
import {ThemedSmallText} from "@/components/ThemedSmallText";


export const EventsView = ({}) => {
    const [events, setEvents] = useState([])

    const {wfInstance} =  useContext(DataHandlerContext)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const eventsData = await wfInstance.events
            console.log(eventsData)
            setEvents(eventsData)
        } catch(e) {
            console.error('Error fetching events data:', e);
            setEvents([])
        }
    }


    return (
        <ThemedCard>
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
                                    targetTime={item?.expiry}
                                    refresh={fetchEvents}
                                />
                                </ThemedText>
                            </ThemedView>
                        )}
                    /> :
                    <ThemedSmallText>Aucun événement</ThemedSmallText>
            }
        </ThemedCard>
    );
}
