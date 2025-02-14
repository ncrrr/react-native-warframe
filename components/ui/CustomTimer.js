import Timeframe from "react-timeframe";
import {ThemedText} from "../ThemedText";


const CustomTimer = ({ targetDate}) => {

    const dateToUse = targetDate*1000

    return (
        <Timeframe
            targetDate={dateToUse}
            onRender={(state, props, self) => {
                let val;

                let timeInMS = (dateToUse) - new Date().getTime() // time to wait in ms
                if(timeInMS <= 0) {
                    return 'Terminé'
                }

                let leftTime = 0
                const days = Math.floor(timeInMS / 1000 / 60 / 60 / 24) // days
                leftTime = timeInMS - days * 1000 * 60 * 60 * 24
                const hours = Math.floor(leftTime / 1000 / 60 / 60) // hours
                leftTime = timeInMS - hours * 1000 * 60 * 60
                const minutes = Math.floor(leftTime / 1000 / 60) % 60 // minutes
                leftTime = timeInMS - minutes * 1000 * 60
                const seconds = Math.floor(leftTime / 1000) % 60 // seconds

                val = ``
                if (days) {
                    val += `${days}j `
                }
                if (hours) {
                    val += `${hours}h `
                }
                if (minutes) {
                    val += `${minutes}m `
                }
                if (seconds) {
                    val += `${seconds}s`
                }

                return val;
            }}
        />
    )
}

export default CustomTimer
