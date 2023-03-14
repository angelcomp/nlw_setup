import { useNavigation } from '@react-navigation/native'
import { Image, Text, View } from 'react-native'
import EmptyImage from "../assets/empty.png"

export function HabitEmpty() {

    const navigation = useNavigation()
    const { navigate } = useNavigation()

    function showCreateHabitScreen() {
        navigation.pop()
        navigate('createHabit')
    }

    return (
        <View className='flex-1 justify-center items-center'>

            <Text className='text-zinc-400 text-base text-center'>
                Você ainda não adicionou nenhum hábito {`\n`}

                <Text className='text-violet-600 text-base underline active:text-violet-400' onPress={() => showCreateHabitScreen()}>
                    clique aqui para criar
                </Text>
            </Text>

            <Image source={EmptyImage} className="h-auto max-w-xs"/>

        </View>
    )
}