import {ComponentProps, useEffect, useState} from "react";
import {ThemedText} from "@/components/ThemedText";

const getRemaining = (targetTime: number): TimeValues => {
    const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
    let delta = targetTime - currentTime

    if (delta < 0) {
        return {hours: 0, minutes: 0, seconds: 0}
    }

    const hours = Math.floor(delta / 3600)
    delta -= hours * 3600
    const minutes = Math.floor(delta / 60)
    delta -= minutes * 60
    const seconds = delta

    return {hours, minutes, seconds}
}

const CustomTimer = ({targetTime, refresh, textProps}: CustomTimerProps) => {
    const [remainingTime, setRemainingTime] = useState<TimeValues>({hours: 1, minutes: 0, seconds: 0})

    // Update every second
    useEffect(() => {
        (async () => {
            let interval = setInterval(() => {
                const newRemainingTime = getRemaining(targetTime)
                setRemainingTime(newRemainingTime)
            }, 1000)

            // we catch our event here to refresh datas

            // If time is up, call refresh function if provided
            if (
                remainingTime.hours <= 0 &&
                remainingTime.minutes <= 0 &&
                remainingTime.seconds <= 0 &&
                typeof refresh === 'function'
            ) {
                await refresh()
                clearInterval(interval)
            }
        })()

    }, [remainingTime]);

    const {hours, minutes, seconds} = remainingTime

    return (
            `${hours > 0 && `${hours}h `}${minutes > 0 && `${minutes}m `}${seconds >= 0 && `${seconds}s`}`
    )
}

interface CustomTimerProps {
    targetTime: number;
    refresh?: () => void;
    textProps?: ComponentProps<typeof ThemedText>;
}

interface TimeValues {
    hours: number;
    minutes: number;
    seconds: number;
}

export default CustomTimer
