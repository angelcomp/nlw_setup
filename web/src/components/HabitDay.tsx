    import * as Popover from "@radix-ui/react-popover"
import * as Checkbox from "@radix-ui/react-checkbox"
import clsx from "clsx"
import { ProgressBar } from "./ProgressBar"
import { Check } from "phosphor-react"
import dayjs from "dayjs"

interface HabitDayProps {
    date: Date
    completed?: number
    amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date}: HabitDayProps) {

    const percentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

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

                    <div className="mt-6 flex flex-col gap-3">
                        <Checkbox.Root 
                            className="flex items-center gap-3 group"
                        >
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                                <Checkbox.Indicator>
                                    <Check />
                                </Checkbox.Indicator>
                            </div>

                            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                                Beber 2L de agua
                            </span>
                        </Checkbox.Root>
                    </div>

                    <Popover.Arrow height={20} width={60}  className="fill-zinc-900 -mt-1"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default HabitDay