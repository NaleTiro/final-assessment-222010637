import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import OnboardingScreen1 from "../screens/Onboarding/Onboarding1";
import OnboardingScreen2 from "../screens/Onboarding/Onboarding2";
import OnboardingScreen3 from "../screens/Onboarding/Onboarding3";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkedOnboard, setCheckedOnboard] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const hasSeen = await AsyncStorage.getItem("hasOnboarded");
        setShowOnboarding(!hasSeen);
      } catch (e) {
        setShowOnboarding(true);
      } finally {
        setCheckedOnboard(true);
      }
    })();
  }, []);

  if (!checkedOnboard) return null; // or a splash screen

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <>
          <Stack.Screen name="Onboard1" component={OnboardingScreen1} />
          <Stack.Screen name="Onboard2" component={OnboardingScreen2} />
          <Stack.Screen name="Onboard3" component={OnboardingScreen3} />
        </>
      ) : null}

      {user ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
