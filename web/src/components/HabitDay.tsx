    import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"
import { ProgressBar } from "./ProgressBar"
import dayjs from "dayjs"
import { HabitsList } from "./HabitsList"
import { useState } from "react"

interface HabitDayProps {
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date}: HabitDayProps) {
    
    const [completed, setCompleted] = useState(defaultCompleted)
    
    const percentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
    
    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')
    
    function handleCompletedChanged(amountCompleted: number) {
        setCompleted(amountCompleted)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
              className={clsx("w-10 h-10 bg-zinc-800 border-2 border-zinc-800 rounded-lg", {
                'bg-zinc-900 border-zinc-800': percentage === 0,
                'bg-violet-900 border-violet-500': percentage > 0 && percentage < 20,
                'bg-violet-800 border-violet-500': percentage >= 20 && percentage < 40,
                'bg-violet-700 border-violet-500': percentage >= 40 && percentage < 60,
                'bg-violet-600 border-violet-500': percentage >= 60 && percentage < 80,
                'bg-violet-500 border-violet-400': percentage >= 80,
              })}
            />
            <Popover.Portal>

                <Popover.Content className="min-w-[320px] rounded-2xl p-6 bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{ dayOfWeek }</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{ dayAndMonth }</span>

                    <ProgressBar progress={percentage}/>

                    <HabitsList date={date} onCompletedChanged={handleCompletedChanged}/>

                    <Popover.Arrow height={20} width={60}  className="fill-zinc-900 -mt-1"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default HabitDay