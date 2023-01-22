import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CreateHabit } from "../screens/CreateHabit";
import { DetailsHabit } from "../screens/DetailsHabit";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="home"
                component={Home}
            />

            <Screen
                name="detailsHabit"
                component={DetailsHabit}
            />

            <Screen
                name="createHabit"
                component={CreateHabit}
            />
        </Navigator>
    )
}