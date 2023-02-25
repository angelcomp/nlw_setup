import { useEffect, useState } from "react"
import { View, Text, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"

import { api } from "../lib/axios"
import { generateDatesFromYear } from "../utils/generate-dates-from-year"

import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import HabitDaysPlaceHolder from "../components/HabitDayPlaceholder"
import { DAY_SIZE, HabitDay } from "../components/HabitDay"

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYear()

const minimumSummaryDataSize = 18 * 7
const amountOfDaysToFill= minimumSummaryDataSize - summaryDates.length

type summaryProps = Array<{
    id: string
    date: string
    amount: number
    completed: number
}>

export function Home() {

    const [ loading, setLoading ] = useState(true)
    const [summary, setSummary ] = useState<summaryProps | null>(null)

    const { navigate } = useNavigation()

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('/summary')
            setSummary(response.data)
            console.log(response.data)
        } catch (error) {
            Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(loading) {
        return (
            <Loading />
        )
    }
 
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
                {
                    summary &&
                    <View className="flex-row flex-wrap">
                    {
                        summaryDates.map(date => 
                        {
                            const dayWithHabits = summary.find(day => {
                                return dayjs(date).isSame(day.date, 'day')
                            })

                            return <HabitDay 
                                key={date.toString()}
                                date={date}
                                amountCompleted={dayWithHabits?.completed}
                                amountOfHabits={dayWithHabits?.amount}
                                onPress={() => navigate('detailsHabit', { date: date.toISOString() })}
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
                    </View>
                }
            </ScrollView>
        </View>
    )
}
