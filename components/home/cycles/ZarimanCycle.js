import {ThemedView} from "../../ThemedView";
import {ThemedText} from "../../ThemedText";


export const ZarimanCycle = ({zarimanCycle}) => {
    return (
        <ThemedView style={{flex: 1, backgroundColor: '#222', borderRadius: 15, padding: 20}}>
            <ThemedText type={'subtitle'} style={{fontSize: 28, textAlign: 'center', fontWeight: 700}}>Zariman</ThemedText>

            <ThemedText style={{color: 'white', textAlign: 'center'}}>{zarimanCycle?.shortString}</ThemedText>
            <ThemedText style={{color: 'white', textAlign: 'center'}}>{zarimanCycle?.state}</ThemedText>
        </ThemedView>
    );
}
