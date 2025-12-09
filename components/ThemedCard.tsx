import {ThemedView} from "@/components/ThemedView";
import {useColorScheme, ViewProps, ViewStyle} from "react-native";
import {ReactElement} from "react";

export type ThemedCardProps = ViewProps

export function ThemedCard({style, ...rest}: ThemedCardProps): ReactElement {
    const theme = useColorScheme()

    return (
        <ThemedView style={{backgroundColor: theme === 'light' ? '#DDD' : '#222', borderRadius: 15, padding: 10, ...style}} {...rest} />
    )
}