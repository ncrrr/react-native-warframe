import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";


export const CetusCycle = ({cetusCycle}) => {
    return (
        <ThemedView style={{flex: 1,backgroundColor: '#222', borderRadius: 15, padding: 10, alignItems: 'center'}}>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Cetus</ThemedText>

            <ThemedText style={{color: 'white', textAlign: 'center'}}>{cetusCycle?.timeLeft}</ThemedText>
            {
                cetusCycle?.isDay ?
                    <Ionicons name="sunny-sharp" size={35} color="orange" /> :
                    <Ionicons name="moon" size={35} color="white" />

            }
        </ThemedView>
    );
}
