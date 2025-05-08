import { createStyle, useThemeStyle } from "pt-care-libs";
import { View } from "react-native";

export default function MyScreen() {
  const styles = useThemeStyle(themedStyles);

  return <View style={styles.block}></View>;
}

const themedStyles = createStyle(({ themeColor }) => ({
  block: {
    backgroundColor: themeColor.background.primary,
    flex: 1,
  },
}));
