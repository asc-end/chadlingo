import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectLanguage, StakeScreen, WelcomeScreen } from '.';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import setNewChallenge from '../../lib/firebase/setNewChallenge';
import { fetchSecureDate } from '../../lib/dates/fetchSecureDate';

import useStore from '../../lib/state';
import getFlashCardsByDate from '../../lib/firebase/getFlashCardsByDate';
import AllowNotifications from './AllowNotifications';
const Stack = createNativeStackNavigator();

export default function BeginChallenge() {
    const [language, setLanguage] = useState<string>();
    const { updateFlow, setChallenge} = useStore()

    async function onFormFinish() {
        if (language) {
            
            const date = await fetchSecureDate();
            if(!date) return
            let challenge:Challenge = { beginDate: date.getTime(), language: language, nbDone: 0, ended: false}
            setNewChallenge("marie", challenge)
            setChallenge(challenge)
            updateFlow("home")
        }
    }
    return (

        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Language1" >
                {(props) => <SelectLanguage {...props} index={1} />}
            </Stack.Screen>
            <Stack.Screen name="Language2" >
                {(props) => <SelectLanguage {...props} index={2} setLanguage={setLanguage} />}
            </Stack.Screen>
            <Stack.Screen name="Notifs" component={AllowNotifications}/>
            <Stack.Screen name="Stake">
                {(props) => <StakeScreen  {...props} onFinish={onFormFinish} />}
            </Stack.Screen>
        </Stack.Navigator>
    )

}