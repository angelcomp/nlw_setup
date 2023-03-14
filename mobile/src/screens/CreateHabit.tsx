import { useState } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import { api } from '../lib/axios';

const WEEK_DAYS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

export function CreateHabit() {

    const [title, setTitle] = useState('')

    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewHabit() {
        try {
            if(!title.trim() || weekDays.length === 0) {
                return Alert.alert('Novo Hábito', 'Informe o título para o hábito criado e escolha a periodicidade')
            }

            await api.post('/habits', { title, weekDays })

            setTitle('')
            setWeekDays([])
            Alert.alert('Novo Hábito', 'Hábito criado com sucesso')

        } catch (error) {
            console.log(error)
            Alert.alert('Ops', 'Não foi possível criar o novo hábito')
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
                    onChangeText={setTitle}
                    value={title}
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

                <TouchableOpacity 
                    className='w-full h-14 flex-row bg-green-600 mt-6 p-3 rounded-md justify-center items-center'
                    onPress={handleCreateNewHabit}
                >
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