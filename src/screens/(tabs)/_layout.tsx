import { MaterialIcons } from "@expo/vector-icons";
import { useGetUserSuspenseQuery } from "@features/user/useGetUserSuspenseQuery";
import { Tabs, useRouter } from "expo-router";
import {
  createStyle,
  useHeaderStyle,
  useThemeStyle,
  colors,
} from "pt-care-libs";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const styles = useThemeStyle(themedStyles);
  const { data } = useGetUserSuspenseQuery();
  const insets = useSafeAreaInsets();
  const headerStyle = useHeaderStyle({
    insets,
  });

  const colorScheme = useColorScheme();

  const router = useRouter();

  const isLoginIn = !!data.user;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity
                style={styles.headerRight}
                onPress={() => router.navigate("/setting")}
                activeOpacity={0.3}
              >
                <MaterialIcons
                  size={28}
                  color={
                    colorScheme === "dark"
                      ? colors.basic.white
                      : colors.basic.black
                  }
                  name="settings"
                />
              </TouchableOpacity>
            );
          },
          headerShadowVisible: false,
          ...headerStyle,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "일정",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="calendar-month" color={color} />
          ),
          headerShadowVisible: false,
          ...headerStyle,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "로그인",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="login" color={color} />
          ),
          tabBarButton: isLoginIn ? () => null : undefined,
          headerShown: false,
          headerShadowVisible: false,
          ...headerStyle,
        }}
      />
    </Tabs>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  tabBarActiveTintColor: { color: themeColor.brand.primary },
  tabBarInactiveTintColor: { color: themeColor.action.disabled },
  tabBarStyle: {
    backgroundColor: themeColor.background.secondary,
    borderTopWidth: 0,
  },
  headerStyle: {
    backgroundColor: themeColor.background.secondary,
  },
  headerRight: {
    marginRight: 16,
  },
}));
