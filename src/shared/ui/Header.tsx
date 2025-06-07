import React, { ReactNode } from "react";
import { EdgeInsets } from "react-native-safe-area-context";
import { useHeaderStyle } from "./useHeaderStyle";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  leftNode?: ReactNode;
  title?: string;
  rightNode?: ReactNode;
  insets: EdgeInsets;
}

export function Header({ leftNode, title, rightNode, insets }: HeaderProps) {
  const { headerStyle, headerTitleStyle } = useHeaderStyle({
    insets,
  });

  return (
    <View
      style={[
        headerStyle,
        styles.header,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.flex1}>{leftNode}</View>
      <Text style={headerTitleStyle}>{title}</Text>
      <View style={styles.flex1}>{rightNode}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
