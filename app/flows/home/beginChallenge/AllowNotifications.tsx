import { View, Text, Pressable, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MainButton } from "../../../components/Buttons";
import { useEffect, useState } from "react";
import Slider from '@react-native-community/slider';
import { getValueFor, save } from "../../../lib/secure-store/secureStore";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}



function SwitchSetting({ title, text, code, isEnabled, setIsEnabled }: { title: string, text: string, code: string, isEnabled?: boolean, setIsEnabled: React.Dispatch<React.SetStateAction<boolean>> }) {
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
      async function fetchSecureStore() {
          const value = await getValueFor(code)
          if (!value)
              setIsEnabled(true)
          else setIsEnabled(value === 'true')
      }
      fetchSecureStore()
  }, [])

  function onToggleSwitch() {
      save(code, (!isEnabled).toString())
      toggleSwitch()
  }

  return (
      <Pressable className="flex flex-row py-4 px-6 bg-white/10 w-full rounded-md justify-between" onPress={onToggleSwitch}>
          <View className="flex flex-col w-auto">
              <Text className="text-white text-2xl w-auto">{title}</Text>
              <Text className="text-white/50 w-64">
                  {text}
              </Text>
          </View>
          <Switch onChange={onToggleSwitch} value={isEnabled} trackColor={{ false: "#434343", true: "#00FF" }} />
      </Pressable>)
}

export default function AllowNotifications({ navigation }: { navigation: any }) {
  const [notifs, setNotifs] = useState(false)
  const [notificationHour, setNotificationHour] = useState(12); // Default to 12:00 PM

  useEffect(() => {
    async function fetchSecureStore() {
      const value = await getValueFor("notifs")
      if (value) save("notifs", "false")
    }
    fetchSecureStore()


  }, [])

  function onNextPress() {
    save("notificationHour", notificationHour.toString());

    navigation.navigate("Stake")
  }

  return <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
    <View className="relative flex flex-col items-center py-12 px-6  h-full" style={{ gap: 30 }}>
      <Pressable onPress={() => {setNotifs(!notifs); console.log("press")}}>
        <SwitchSetting title={"Notifications"} text="If you agree, we can remind you to do your daily tasks!" code="notifs" isEnabled={notifs} setIsEnabled={setNotifs} />
      </Pressable>
      {notifs &&
        <View className="flex flex-col items-center mt-32">
          <Text className="text-white font-medium text-2xl text-center">Selected notification Hour</Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={0}
            maximumValue={24}
            step={1} 
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#00FF"
            value={notificationHour}
            onValueChange={(value) => setNotificationHour(value)}
          />
          <Text className="text-white">{notificationHour}:00</Text>
        </View>
      }
      <View className="absolute bottom-8 left-8 right-8">
        <MainButton onPress={onNextPress} text="Next" full />
      </View>
    </View >
  </LinearGradient>
}
