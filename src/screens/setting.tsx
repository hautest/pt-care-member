import { MaterialIcons } from "@expo/vector-icons";
import { createStyle, RadioButton, useThemeStyle } from "pt-care-libs";
import { useState } from "react";
import { Appearance, ColorSchemeName, Text, View } from "react-native";

export default function SettingScreen() {
  const styles = useThemeStyle(themedStyles);

  const [theme, setTheme] = useState<ColorSchemeName>(() =>
    Appearance.getColorScheme()
  );

  const handleThemeChange = (theme: ColorSchemeName) => {
    setTheme(theme);
    if (theme === "light" || theme === "dark") {
      Appearance.setColorScheme(theme);
    } else {
      Appearance.setColorScheme(null);
    }
  };

  return (
    <View style={styles.block}>
      <Text style={styles.text}>테마 설정</Text>
      <Text style={styles.description}>테마 설정을 변경할 수 있습니다.</Text>
      <View style={styles.radioGroup} accessibilityRole="radiogroup">
        <RadioButton
          style={styles.radioButton}
          checked={theme === "light"}
          onCheckChange={() => handleThemeChange("light")}
        >
          <View style={styles.radioContent}>
            <Text style={styles.radioLabel}>라이트</Text>
            <MaterialIcons name="light-mode" size={24} />
          </View>
        </RadioButton>
        <RadioButton
          style={styles.radioButton}
          checked={theme === "dark"}
          onCheckChange={() => handleThemeChange("dark")}
        >
          <View style={styles.radioContent}>
            <Text style={styles.radioLabel}>다크</Text>
            <MaterialIcons name="dark-mode" size={24} />
          </View>
        </RadioButton>
        <RadioButton
          style={styles.radioButton}
          checked={theme === null}
          onCheckChange={() => handleThemeChange(null)}
        >
          <View style={styles.radioContent}>
            <Text style={styles.radioLabel}>시스템</Text>
            <MaterialIcons name="settings" size={24} />
          </View>
        </RadioButton>
      </View>
      <Text style={styles.text}>알림 설정</Text>
      <Text style={styles.description}>
        알람 수신을 동의해야{`\n`}알림을 받을 수 있습니다.
      </Text>
    </View>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  block: {
    backgroundColor: themeColor.background.primary,
    flex: 1,
    padding: 16,
  },
  text: {
    color: themeColor.text.secondary,
    fontSize: typo.sizes.h2,
    fontWeight: typo.weights.bold,
    marginBottom: 8,
  },
  description: {
    color: themeColor.text.tertiary,
    fontSize: typo.sizes.h3,
    fontWeight: typo.weights.medium,
    marginBottom: 24,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 8,
  },
  radioLabel: {
    color: themeColor.text.inverse,
    fontSize: typo.sizes.bodyMedium,
    fontWeight: typo.weights.bold,
  },
  radioContent: {
    alignItems: "center",
    gap: 4,
  },
  radioButton: {
    flex: 1,
  },
}));
