import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";


export const CambionCycle = ({cambionCycle}) => {
    return (
        <ThemedView style={{flex:1, backgroundColor: '#222', borderRadius: 15, padding: 10}}>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Cambion</ThemedText>

            <ThemedText style={{color: 'white', textAlign: 'center', textTransform: 'capitalize'}}>{cambionCycle?.state}</ThemedText>
            <ThemedText style={{color: 'white', textAlign: 'center'}}>{cambionCycle?.timeLeft}</ThemedText>
        </ThemedView>
    );
}
