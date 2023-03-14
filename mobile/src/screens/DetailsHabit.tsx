import { View, Text, ScrollView, Alert } from "react-native";
import { useEffect, useState } from 'react'
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import dayjs from "dayjs";
import { useRoute } from "@react-navigation/native";
import { ProgressBar } from "../components/ProgressBar";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitEmpty } from "../components/HabitEmpty";

interface Params {
    date: string
}

interface DayInfoProps {
    completed: string[]
    possibleHabits: {
        id: string,
        title: string
    }[]
}

export function DetailsHabit() {

    const [loading, setLoading] = useState<boolean>()
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const route = useRoute();
    const { date } = route.params as Params

    const parsedDay = dayjs(date)
    const dayOfWeek = parsedDay.format('dddd')
    const dayandMonth = parsedDay.format('DD/MM')
    
    const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    useEffect(() => {
        // fetchHabits()
    }, [])

    if(loading) {
        return (
            <Loading />
        )
    }

    function handleToggleHabit(habitId: string) {
        if (completedHabits.includes(habitId)) {
            setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
        } else {
            setCompletedHabits(prevState => [...prevState, habitId])
        }
    }

    async function fetchHabits() {
        try {
            setLoading(true)
            const response = await api.get('/day', { params: { date }})
            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabits)
        } catch(error) {
            console.log(error)
            Alert.alert('Ops', 'Não foi possível buscar as informações dos hábitos deste dia :/')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView>

                <BackButton />

                <Text className="text-zinc-400 font-semibold text-base lowercase mt-6">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayandMonth}
                </Text>

                <ProgressBar progress={habitsProgress}/>

                <View className="mt-6">
                    
                    {
                        dayInfo?.possibleHabits ? 
                        dayInfo.possibleHabits.map((habit, id) => {
                            return ( 
                                <CheckBox
                                    key={id}
                                    title={habit.title} 
                                    checked={completedHabits.includes(habit.id)}
                                    onPress={() => handleToggleHabit(habit.id)}
                                />
                            )
                        }) : <HabitEmpty />
                    }
                    
                </View>
            </ScrollView>
        </View>
    )
}