import Timeframe from "react-timeframe";
import {ThemedText} from "../ThemedText";


const CustomTimer = ({ targetDate, updateDatas }) => {
    return (
        <Timeframe
            targetDate={targetDate}
            onRender={(state, props, self) => {
                let val;
                const updateDatasExists = typeof updateDatas === 'function'

                if (state?.complete && updateDatasExists) {
                    console.log('==2')
                    updateDatas()
                    val = 'Chargement...'
                } else {
                    const timeInMS = (new Date(targetDate).getTime()) - new Date()// time to wait in ms
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

                    if(
                        (days < 0 ||
                        hours < 0 ||
                        minutes < 0 ||
                        seconds < 0) && updateDatasExists
                    ) {
                        console.log('==1')
                        val = 'Chargement...'
                        updateDatas()
                    }
                }
                return val;
            }}
        />
    )
}

export default CustomTimer
