import { View, Text, ScrollView } from "react-native"
import { DAY_SIZE, HabitDay } from "../components/HabitDay"
import { generateDatesFromYear } from "../utils/generate-dates-from-year"
import { Header } from "../components/Header"
import HabitDaysPlaceHolder from "../components/HabitDayPlaceholder"

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYear()

const minimumSummaryDataSize = 18 * 7
const amountOfDaysToFill= minimumSummaryDataSize - summaryDates.length

export function Home() {
    return (
        <View className="flex-1 bg-background px-8 pt-16">
           <Header/>

            <View className="w-full flex-row justify-between mt-6 mb-2">
                {
                    WEEK_DAYS.map((weekDay, i) => (
                        <Text key={i}
                            className="text-zinc-400 text-xl font-bold"
                            style={{width: DAY_SIZE}}
                        >{weekDay}</Text>
                    ))
                }
            </View>

            <ScrollView contentContainerStyle={{paddingBottom: 50}}>
                <View className="flex-row flex-wrap">
                        {
                            summaryDates.map(date => {
                                return <HabitDay key={date.toString()}/>
                            })
                        }
                        {
                            amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map( (_, i) => {
                                return (
                                    <HabitDaysPlaceHolder key={`${i}`}/>
                                    )
                                })
                            }
                </View>
            </ScrollView>
        </View>
    )
}
