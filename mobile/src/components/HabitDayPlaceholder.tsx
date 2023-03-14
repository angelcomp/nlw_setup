import { View } from 'react-native'
import { DAY_SIZE } from './HabitDay'

export function HabitDaysPlaceHolder() {
    return (
        <View 
            className='rounded-lg border-2 m-1 border-zinc-800 opacity-40'
            style={{width: DAY_SIZE, height: DAY_SIZE}}
        ></View>
    )
}

export default HabitDaysPlaceHolder