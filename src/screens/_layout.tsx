import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@shared/design/colors";
import { useIsDarkMode } from "@shared/hooks/useIsDarkMode";
import { queryClient } from "@shared/queryClient/queryClient";
import { GlobalLoading, useGetGlobalLoading } from "@shared/ui/GlobalLoading";
import { Header } from "@shared/ui/Header";
import { Modal } from "@shared/ui/Modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import "react-native-reanimated";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const globalLoading = useGetGlobalLoading();

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const isDarkMode = useIsDarkMode();

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
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        {globalLoading && <GlobalLoading />}
        <Modal />
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
                          isDarkMode ? colors.basic.white : colors.basic.black
                        }
                        name="arrow-back"
                      />
                    </TouchableOpacity>
                  }
                />
              ),
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
