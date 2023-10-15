import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

import Home from "./Home";
import Settings from "./settings/Settings";
import Profile from "./profile/Profile";
import Play from "./play/Play";
import SignDay from "./signDay/SignDay";
import SelectLanguage from "./settings/SelectLanguage";

const HomeStack = createNativeStackNavigator();

export default function HomeRoot() {
    console.log("home root")
    return (
        <HomeStack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
            <HomeStack.Group screenOptions={{ animation: "none" }}>
                <HomeStack.Screen name="home" component={Home} />
                <HomeStack.Screen name="play" component={Play} />
                <HomeStack.Screen name="signDay" component={SignDay} />
                {/* <HomeStack.Screen  name="test" component={Home}/> */}
            </HomeStack.Group>
            <HomeStack.Group screenOptions={{ presentation: "transparentModal" }}>
                <HomeStack.Screen name="settingsModal" component={Settings} />
                <HomeStack.Screen name="profileModal" component={Profile} />
                <HomeStack.Screen name="setLang" component={SelectLanguage}/>
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}