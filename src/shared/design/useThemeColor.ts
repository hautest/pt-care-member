import { useIsDarkMode } from "@shared/hooks/useIsDarkMode";
import { colors } from "./colors";

export const useThemeColor = () => {
  const isDark = useIsDarkMode();

  return isDark ? colors["dark"] : colors["light"];
};
