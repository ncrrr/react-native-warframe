import {ThemedText, ThemedTextProps} from "@/components/ThemedText";


export function ThemedSmallText({style, ...rest}: ThemedTextProps) {
    return <ThemedText style={{textAlign: 'center', fontStyle: 'italic', color: 'grey', ...style}} {...rest}/>
}