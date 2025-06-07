import { useColorScheme } from "react-native";
import { themeMMKV } from "../utils";

export const useIsDarkMode = () => {
  const [colorScheme] = themeMMKV.useMMKV();
  const colorSchemeFromSystem = useColorScheme();

  const isDark =
    colorScheme === "system"
      ? colorSchemeFromSystem === "dark"
      : colorScheme === "dark";

  return isDark;
};
