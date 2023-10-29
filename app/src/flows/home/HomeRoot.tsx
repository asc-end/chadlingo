import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Home from "./Home";
import Settings from "./settings/Settings";
import PlayLanguage from "./play/language/Play";
import SignDay from "./play/signDay/SignDay";
import { AllowNotifications, SelectChallenge, Stake, SelectLanguage } from "./beginChallenge";
import { useState } from "react";
import { Lose, Win } from "./finishChallenge";
import SelectDuration from "./beginChallenge/meditation/SelectDuration";
import PlayMeditation from "./play/meditation/PlayMeditation";


const HomeStack = createNativeStackNavigator();

export default function HomeRoot() {
  const [newChallengeState, setNewChallengeState] = useState<{
    type?: ChallengeType;
    languageFrom?: LanguageType;
    languageTo?: LanguageType;
    duration?: number
  }>();

  return (
    <HomeStack.Navigator initialRouteName="home" screenOptions={{ headerShown: false, animation: "none" }}>
      <HomeStack.Group>
        <HomeStack.Screen name="home" component={Home} />
      </HomeStack.Group>

      {/* Begin Challenge flow */}
      <HomeStack.Group>
        <HomeStack.Screen name="SelectChallenge">
          {(props) => (
            <SelectChallenge
              {...props}
              setType={(type: ChallengeType) => setNewChallengeState({ ...newChallengeState, type: type })}
            />
          )}
        </HomeStack.Screen>

        <HomeStack.Screen name="SelectDuration">
          {(props) => (
            <SelectDuration
              {...props}
              setDuration={(duration: number) =>
                setNewChallengeState({ ...newChallengeState, duration: duration })
              }
            />
          )}
        </HomeStack.Screen>
        <HomeStack.Screen name="Language1">
          {(props) => (
            <SelectLanguage
              {...props}
              index={1}
              setLanguage={(language: LanguageType) =>
                setNewChallengeState({ ...newChallengeState, languageFrom: language })
              }
            />
          )}
        </HomeStack.Screen>
        <HomeStack.Screen name="Language2">
          {(props) => (
            <SelectLanguage
              {...props}
              index={2}
              nativeLanguage={newChallengeState?.languageFrom!}
              setLanguage={(language: LanguageType) =>
                setNewChallengeState({ ...newChallengeState, languageTo: language })
              }
            />
          )}
        </HomeStack.Screen>
        <HomeStack.Screen name="Notifs" component={AllowNotifications} />
        <HomeStack.Screen name="Stake">
          {(props) => <Stake {...props} newChallengeState={newChallengeState!} />}
        </HomeStack.Screen>
      </HomeStack.Group>

      {/* Play flow */}
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="playLanguage" component={PlayLanguage} />
        <HomeStack.Screen name="playMeditation" component={PlayMeditation}/>
        <HomeStack.Screen name="signDay" component={SignDay} />
      </HomeStack.Group>

      {/* Finish challenge flow */}
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="win" component={Win} />
        <HomeStack.Screen name="lose" component={Lose} />
      </HomeStack.Group>

      {/* Settings flow */}
      <HomeStack.Group screenOptions={{ presentation: "modal" }}>
        <HomeStack.Screen name="settingsModal" component={Settings} />
        {/* <HomeStack.Screen name="setLang" component={SelectLanguage} /> */}
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}
