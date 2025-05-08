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
import { Pressable, TouchableOpacity, useColorScheme } from "react-native";
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
          title: "홈",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
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
        name="my"
        options={{
          title: isLoginIn ? "내정보" : "로그인",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              size={28}
              name={isLoginIn ? "person" : "login"}
              color={color}
            />
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
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                if (isLoginIn) {
                  router.replace("/my");
                } else {
                  router.navigate("/login");
                }
              }}
            />
          ),
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
