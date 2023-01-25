import { View, Text, ScrollView } from "react-native";
import { useState } from 'react'
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import dayjs from "dayjs";
import { useRoute } from "@react-navigation/native";
import { ProgressBar } from "../components/ProgressBar";

interface Params {
    date: String
}

export function DetailsHabit() {

    const route = useRoute();
    const { date } = route.params as Params

    const parsedDay = dayjs(date)
    const dayOfWeek = parsedDay.format('dddd')
    const dayandMonth = parsedDay.format('DD/MM')
    console.log(dayOfWeek, dayandMonth)

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

                <ProgressBar progress={50}/>

                <View className="mt-6">
                    <CheckBox title="Exercícios" onPress={() => handleToggleWeekDay(1)}/>
                    <CheckBox title="2L de agua" checked onPress={() => handleToggleWeekDay(1)}/>
                </View>
            </ScrollView>
        </View>
    )
}