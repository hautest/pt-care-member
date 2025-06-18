import { useGetUserSuspenseQuery } from "@features/user/queries/useGetUserSuspenseQuery";
import { useLoginMutation } from "@features/user/queries/useLoginMutation";
import { queryClient } from "@shared/queryClient/queryClient";
import { createStyle, useThemeStyle } from "@shared/ui/createStyle";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const styles = useThemeStyle(themedStyles);
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const { mutate: login } = useLoginMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: useGetUserSuspenseQuery.queryKey,
      });
      router.dismissAll();
    },
  });

  return (
    <View style={styles.block}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>손쉬운 PT 케어 서비스</Text>
          <Text style={styles.description}>
            전문 트레이너와 함께 건강한 라이프스타일을 만들어보세요
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.3}
          style={[styles.button, { marginBottom: insets.bottom + 16 }]}
          onPress={() => login()}
        >
          <Text style={styles.buttonText}>카카오로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  block: {
    flex: 1,
    backgroundColor: themeColor.background.primary,
  },
  backgroundImage: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: typo.sizes.h1,
    fontWeight: typo.weights.bold,
    color: themeColor.text.primary,
    marginVertical: 16,
  },
  description: {
    fontSize: typo.sizes.h3,
    color: themeColor.text.secondary,
    fontWeight: typo.weights.medium,
  },
  userMode: {
    fontSize: typo.sizes.bodyLarge,
    color: themeColor.text.secondary,
    fontWeight: typo.weights.medium,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FEE500",
  },
  buttonText: {
    fontSize: typo.sizes.bodyLarge,
    fontWeight: typo.weights.bold,
    textAlign: "center",
  },
  icon: {
    color: themeColor.text.primary,
  },
}));
