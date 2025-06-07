import { createStyle, useThemeStyle } from "@shared/ui/createStyle";
import { View, Text } from "react-native";

export default function TabTwoScreen() {
  const styles = useThemeStyle(themedStyles);

  return (
    <View style={styles.block}>
      <Text>schedule</Text>
    </View>
  );
}

const themedStyles = createStyle(({ themeColor }) => ({
  block: {
    backgroundColor: themeColor.background.primary,
    flex: 1,
  },
}));
