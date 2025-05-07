import { View, Text, Button, Appearance } from "react-native";
import { createStyle, useThemeStyle } from "pt-care-libs";
import { supabase } from "@features/supabase/supabase";
import { login } from "@react-native-seoul/kakao-login";

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
        <Button
          title="로그인"
          onPress={async () => {
            try {
              const { idToken } = await login();
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "kakao",
                token: idToken,
              });
            } catch (error) {
              console.log(error);
            }
          }}
        />
        <Button
          title="nickn ame 변경"
          onPress={async () => {
            try {
              const { data, error } = await supabase.auth.updateUser({
                data: {
                  nickname: "leee",
                },
              });
            } catch (error) {
              console.log(error);
            }
          }}
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
