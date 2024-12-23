// file: RootLayout.tsx
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootSiblingParent } from 'react-native-root-siblings';

const RootLayout = () => {
  return (
    <RootSiblingParent>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/login"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/signup"
            options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/verify"
            options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/forgot-password"
            options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }} />
          <Stack.Screen
            name="product/index"
            options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </RootSiblingParent>
  )
};

export default RootLayout;
