import { generateDatesFromYear } from "../utils/generate-dates-from-year"
import HabitDaysPlaceHolder from "./HabitDayPlaceholder"
import HabitDays from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYear()

const minimumSummaryDataSize = 18 * 7
const amountOfDaysToFill= minimumSummaryDataSize - summaryDates.length

export function SummaryTable() {
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
                        return <HabitDays key={date.toString()} completed={Math.round(Math.random()*5)} amount={5} />
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