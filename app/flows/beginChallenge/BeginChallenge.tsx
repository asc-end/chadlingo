import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectLanguage, StakeScreen, WelcomeScreen } from '.';
import { LinearGradient } from 'expo-linear-gradient';
const Stack = createNativeStackNavigator();

export default function BeginChallenge() {


    return (

        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Language1" >
                {(props) => <SelectLanguage {...props} index={1} />}
            </Stack.Screen>
            <Stack.Screen name="Language2" >
                {(props) => <SelectLanguage {...props} index={2} />}
            </Stack.Screen>
            <Stack.Screen name="Stake" component={StakeScreen} />
        </Stack.Navigator>
    )

}