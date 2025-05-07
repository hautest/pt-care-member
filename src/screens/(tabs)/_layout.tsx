import { MaterialIcons } from "@expo/vector-icons";
import { useGetUserSuspenseQuery } from "@features/user/useGetUserSuspenseQuery";
import { Tabs } from "expo-router";
import { createStyle, useThemeStyle } from "pt-care-libs";
import React from "react";

export default function TabLayout() {
  const styles = useThemeStyle(themedStyles);
  const { data } = useGetUserSuspenseQuery();

  const isLoginIn = !!data.user;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
          tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
          headerStyle: styles.headerStyle,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "일정",
          tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
          tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="calendar-month" color={color} />
          ),
          headerStyle: styles.headerStyle,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
          tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="login" color={color} />
          ),
          headerStyle: styles.headerStyle,
          tabBarButton: isLoginIn ? () => null : undefined,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const themedStyles = createStyle(({ themeColor }) => ({
  tabBarActiveTintColor: { color: themeColor.brand.primary },
  tabBarInactiveTintColor: { color: themeColor.action.disabled },
  tabBarStyle: {
    backgroundColor: themeColor.background.secondary,
    borderTopWidth: 0,
  },
  headerStyle: {
    backgroundColor: themeColor.background.secondary,
  },
}));
