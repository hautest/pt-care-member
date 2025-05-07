import { View, Text, Button, Appearance } from "react-native";
import { createStyle, useThemeStyle } from "pt-care-libs";
import { supabase } from "@/src/features/supabase/supabase";

export default function HomeScreen() {
  const styles = useThemeStyle(themedStyles);

  return (
    <>
      <View style={styles.test}>
        <Text style={styles.text}>Home</Text>
        <Button
          title="light"
          onPress={() => Appearance.setColorScheme("light")}
        />
        <Button
          title="dark"
          onPress={() => Appearance.setColorScheme("dark")}
        />
      </View>
    </>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  test: {
    backgroundColor: themeColor.background.primary,
    flex: 1,
  },
  text: {
    color: themeColor.text.secondary,
    fontSize: typo.sizes.h1,
    fontWeight: typo.weights.bold,
  },
}));
