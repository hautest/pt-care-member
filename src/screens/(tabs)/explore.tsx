import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <>
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
      /> */}
      <View>
        <Text>Explore</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
