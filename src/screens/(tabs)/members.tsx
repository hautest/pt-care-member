import { MaterialIcons } from "@expo/vector-icons";
import { useIsMemberListEditModeAtom } from "@pages/members/atoms/isMemberListEditModeAtom";
import { colors } from "@shared/design/colors";
import { useIsDarkMode } from "@shared/hooks/useIsDarkMode";
import { createStyle, useThemeStyle } from "@shared/ui/createStyle";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function MembersScreen() {
  const styles = useThemeStyle(themedStyles);

  const navigation = useNavigation();

  const [isMemberListEditMode, setIsMemberListEditMode] =
    useIsMemberListEditModeAtom();

  const isDarkMode = useIsDarkMode();

  useFocusEffect(
    useCallback(() => {
      return () => setIsMemberListEditMode(false);
    }, [setIsMemberListEditMode])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => setIsMemberListEditMode((prev) => !prev)}
              accessibilityLabel="수정모드"
            >
              <MaterialIcons
                name={isMemberListEditMode ? "done" : "mode-edit"}
                size={28}
                color={isDarkMode ? colors.basic.white : colors.basic.black}
              />
            </TouchableOpacity>
            {isMemberListEditMode && (
              <TouchableOpacity
                onPress={() => setIsMemberListEditMode((prev) => !prev)}
                accessibilityLabel="취소하기"
              >
                <MaterialIcons
                  name={"close"}
                  size={28}
                  color={isDarkMode ? colors.basic.white : colors.basic.black}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      },
    });
  }, [
    isDarkMode,
    isMemberListEditMode,
    navigation,
    setIsMemberListEditMode,
    styles.headerLeft,
  ]);

  return (
    <View style={styles.block}>
      <Text>test</Text>
    </View>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  block: {
    backgroundColor: themeColor.background.primary,
    flex: 1,
    padding: 16,
  },
  headerLeft: {
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
}));
