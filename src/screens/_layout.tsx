import { MaterialIcons } from "@expo/vector-icons";
import { queryClient } from "@shared/queryClient/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { colors, Header } from "pt-care-libs";
import { useEffect } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import "react-native-reanimated";
import {
  EdgeInsets,
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="setting"
            options={{
              headerShadowVisible: true,
              header: () => (
                <Header
                  insets={insets}
                  title="설정"
                  leftNode={
                    <TouchableOpacity onPress={() => router.back()}>
                      <MaterialIcons
                        size={28}
                        color={
                          colorScheme === "dark"
                            ? colors.basic.white
                            : colors.basic.black
                        }
                        name="arrow-back"
                      />
                    </TouchableOpacity>
                  }
                />
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
