// file: RootLayout.tsx
import { ErrorBoundaryProps, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootSiblingParent } from 'react-native-root-siblings';
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import AppProvider from "@/context/app.context";
import { Button, Text, View } from "react-native";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 10, gap: 15 }}>
        <View style={{
          backgroundColor: "#333", padding: 10,
          borderRadius: 3, gap: 10
        }}>
          <Text style={{ color: "red", fontSize: 20 }}>
            Something went wrong
          </Text>
          <Text style={{ color: "#fff" }}>{error.message}</Text>
        </View>
        <Button title="Try Again ?" onPress={retry} />
      </View>
    </SafeAreaView>
  );
}

const RootLayout = () => {

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  }

  return (
    <RootSiblingParent>
      <AppProvider>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <ThemeProvider value={navTheme}>
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
              name="(auth)/welcome"
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
              name="product/[id]"
              options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
        {/* </SafeAreaView> */}
      </AppProvider>
    </RootSiblingParent>
  )
};

export default RootLayout;
