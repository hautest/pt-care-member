import { EdgeInsets } from "react-native-safe-area-context";
import { createStyle, useThemeStyle } from "./createStyle";

export const HEADER_HEIGHT = 56;
export const HEADER_HORIZONTAL_PADDING = 16;

interface UseHeaderStyleProps {
  insets: EdgeInsets;
}

export const useHeaderStyle = ({ insets }: UseHeaderStyleProps) => {
  const styles = useThemeStyle(headerStyle);

  return {
    headerStyle: [styles.container, { height: insets.top + HEADER_HEIGHT }],
    tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
    tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
    tabBarStyle: styles.tabBarStyle,
    headerTitleStyle: styles.title,
  };
};

const headerStyle = createStyle(({ themeColor, typo }) => {
  return {
    container: {
      backgroundColor: themeColor.background.secondary,
    },
    title: {
      fontSize: typo.sizes.bodyLarge,
      fontWeight: typo.weights.bold,
      color: themeColor.text.primary,
    },
    tabBarStyle: {
      backgroundColor: themeColor.background.secondary,
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: { color: themeColor.brand.primary },
    tabBarInactiveTintColor: { color: themeColor.action.disabled },
  };
});
