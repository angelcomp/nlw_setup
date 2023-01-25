import { useState } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";

const WEEK_DAYS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

export function CreateHabit() {

    const [weekDays, toggleWeekDay] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            toggleWeekDay(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            toggleWeekDay(prevState => [...prevState, weekDayIndex])
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    placeholder="Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                />

                <Text className="text-white font-semibold mt-4 mb-3 text-base">
                    Qual a recorrência?
                </Text>

                {
                    WEEK_DAYS.map((day, i) => (
                        <CheckBox
                            key={day}
                            title={day}
                            checked={weekDays.includes(i)}
                            onPress={() => handleToggleWeekDay(i)}
                        />
                    ))
                }

                <TouchableOpacity className='w-full h-14 flex-row bg-green-600 mt-6 p-3 rounded-md justify-center items-center'>
                    <Feather 
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className='font-semibold text-white ml-2 text-base'>
                        Confirmar
                    </Text>

                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}