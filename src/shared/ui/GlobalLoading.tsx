import { ActivityIndicator, View } from "react-native";
import { createStyle, useThemeStyle } from "./createStyle";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";

export function GlobalLoading() {
  const styles = useThemeStyle(themedStyles);

  return (
    <View style={styles.block}>
      <ActivityIndicator size="small" color={styles.spinner.color} />
    </View>
  );
}

const themedStyles = createStyle(({ themeColor }) => ({
  block: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  spinner: {
    color: themeColor.brand.primary,
  },
}));

const globalLoading = atom(false);

export const useGlobalLoading = () => {
  const setGlobalLoading = useSetAtom(globalLoading);

  const startLoading = useCallback(() => {
    setGlobalLoading(true);
  }, [setGlobalLoading]);

  const stopLoading = useCallback(() => {
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  return useMemo(
    () => ({ startLoading, stopLoading }),
    [startLoading, stopLoading]
  );
};
export const useGetGlobalLoading = () => useAtomValue(globalLoading);
