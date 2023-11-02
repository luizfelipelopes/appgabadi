import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "../global/styles/theme";
import { About } from "../screens/About";
import { Home } from "../screens/Home";
import { Locations } from "../screens/Locations";

const { Navigator, Screen } = createNativeStackNavigator();


export function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Home" component={Home} />
                <Screen options={{ headerShown: true, headerTintColor: theme.colors.text, headerStyle: { backgroundColor: theme.colors.background } }} name="Sobre Nós" component={About} />
                <Screen options={{ headerShown: true, headerTintColor: theme.colors.text, headerStyle: { backgroundColor: theme.colors.background } }} name="Mídias Sociais" component={Locations} />
            </Navigator>
        </NavigationContainer>
    );
}