import { View, Text, Button } from "react-native";
import { useGetUserSuspenseQuery } from "@features/user/useGetUserSuspenseQuery";
import { supabase } from "@shared/supabase/supabase";
import { useLoginMutation } from "@features/user/useLoginMutation";
import { queryClient } from "@shared/queryClient/queryClient";
import { useLogoutMutation } from "@features/user/useLogoutMutation";
import { createStyle, useThemeStyle } from "@shared/ui/createStyle";
import { themeMMKV } from "@shared/utils";
import { useSetGlobalLoading } from "@shared/ui/GlobalLoading";
import { useModal } from "@shared/ui/Modal";

export default function HomeScreen() {
  const styles = useThemeStyle(themedStyles);

  const { data } = useGetUserSuspenseQuery();

  const { showModal, hideModal } = useModal();

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

  const setGlobalLoading = useSetGlobalLoading();

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
        <Button
          title="로딩 시작"
          onPress={() => {
            setGlobalLoading(true);
            setTimeout(() => {
              setGlobalLoading(false);
            }, 3000);
          }}
        />
        <Button
          title="모달 테스트"
          onPress={() => {
            showModal({
              title: "모달 테스트",
              description: "모달 테스트 내용",
              confirmText: "확인",
              // cancelText: "취소",
              onConfirm: () => {
                hideModal();
              },
              // onCancel: () => {
              //   hideModal();
              // },
            });
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
