import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectLanguage, StakeScreen, WelcomeScreen } from '.';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import setNewChallenge from '../../lib/firebase/setNewChallenge';
import { fetchSecureDate } from '../../lib/dates/fetchSecureDate';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
const connection = new Connection("https://api.devnet.solana.com");

import useStore from '../../lib/state';
import getFlashCardsByDate from '../../lib/firebase/getFlashCardsByDate';
import AllowNotifications from './AllowNotifications';
import getUserChallenge from '../../lib/firebase/getUserChallenge';
import { getPublicKeyFromAddress } from '../../lib/solana/getPublicKeyFromAddress';
const Stack = createNativeStackNavigator();

export default function BeginChallenge() {
    const [language, setLanguage] = useState<string>();
    const { updateFlow, setChallenge, solanaCreds } = useStore()

    async function onFormFinish(amount: number) {
        console.log("language")
        if (language) {
            const date = await fetchSecureDate();
            if (!date) return
            let challenge: Challenge = { beginDate: date.getTime(), language: language, nbDone: 0, ended: false }
            await setNewChallenge(solanaCreds?.account?.address!, challenge)
            let _challenge = await getUserChallenge(solanaCreds?.account?.address!)
            console.log("challenge", _challenge)
            setChallenge(_challenge)
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
            <Stack.Screen name="Notifs" component={AllowNotifications} />
            <Stack.Screen name="Stake">
                {(props) => <StakeScreen  {...props} onFinish={onFormFinish} />}
            </Stack.Screen>
        </Stack.Navigator>
    )

}