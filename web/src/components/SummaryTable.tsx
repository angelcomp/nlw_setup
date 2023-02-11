import { generateDatesFromYear } from "../utils/generate-dates-from-year"
import HabitDaysPlaceHolder from "./HabitDayPlaceholder"
import HabitDays from "./HabitDay"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import dayjs from "dayjs"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYear()

const minimumSummaryDataSize = 18 * 7
const amountOfDaysToFill= minimumSummaryDataSize - summaryDates.length

type Summary = {
    id: string,
    date: string,
    amount: number
    completed: number
}[]

export function SummaryTable() {

    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekDays.map((weekDay, i) => {
                        return (
                            <div 
                                key={`${weekDay} - ${i}`}
                                className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
                            >
                                {weekDay}
                            </div>
                        )
                    })
                }
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summaryDates.map(date => {

                        const dayInSummary = summary.find(day => {
                            return dayjs(date).isSame(day.date, 'day')
                        })

                        return <HabitDays
                            key={date.toString()} 
                            date={date}
                            completed={dayInSummary?.completed} 
                            amount={dayInSummary?.amount} 
                        />
                    })
                }
                {
                    amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map( (_, i) => {
                        return (
                            <HabitDaysPlaceHolder key={`${i}`}/>
                        )
                    })
                }
            </div>
        </div>
    )
}