import { View, Text, Button } from "react-native";
import { createStyle, themeMMKV, useThemeStyle } from "pt-care-libs";
import { useGetUserSuspenseQuery } from "@features/user/useGetUserSuspenseQuery";
import { supabase } from "@shared/supabase/supabase";
import { useLoginMutation } from "@features/user/useLoginMutation";
import { queryClient } from "@shared/queryClient/queryClient";
import { useLogoutMutation } from "@features/user/useLogoutMutation";

export default function HomeScreen() {
  const styles = useThemeStyle(themedStyles);

  const { data } = useGetUserSuspenseQuery();
  const { mutate } = useLoginMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useGetUserSuspenseQuery.queryKey,
      });
    },
  });

  const { mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useGetUserSuspenseQuery.queryKey,
      });
    },
  });

  return (
    <>
      <View style={styles.test}>
        <Text style={styles.text}>Home</Text>
        <Button title="light" onPress={() => themeMMKV.setValue("light")} />
        <Button title="dark" onPress={() => themeMMKV.setValue("dark")} />
        <Button
          title="로그인"
          onPress={() => {
            mutate();
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
        <Button title="로그아웃" onPress={() => logout()} />
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
