import { createStyle, useThemeStyle } from "pt-care-libs";
import { View, Text } from "react-native";

export default function TabTwoScreen() {
  const styles = useThemeStyle(themedStyles);

  return (
    <View style={styles.block}>
      <Text>Explore</Text>
    </View>
  );
}

const themedStyles = createStyle(({ themeColor }) => ({
  block: {
    backgroundColor: themeColor.background.primary,
    flex: 1,
  },
}));
