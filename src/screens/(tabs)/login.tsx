import { createStyle, useThemeStyle } from "pt-care-libs";
import { Text, View } from "react-native";

export default function LoginScreen() {
  const styles = useThemeStyle(themedStyles);

  return (
    <View style={styles.block}>
      <Text>Login</Text>
    </View>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  block: {
    flex: 1,
    backgroundColor: themeColor.background.primary,
  },
}));
