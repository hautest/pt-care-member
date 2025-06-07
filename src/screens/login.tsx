import { MaterialIcons } from "@expo/vector-icons";
import { useGetUserSuspenseQuery } from "@features/user/useGetUserSuspenseQuery";
import { useLoginMutation } from "@features/user/useLoginMutation";
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
        <View>
          <Text style={styles.userMode}>어떤 서비스를 이용하시나요?</Text>
          <TouchableOpacity
            activeOpacity={0.3}
            style={[styles.button, styles.memberButton]}
            onPress={() => login({ userMode: "member" })}
          >
            <MaterialIcons name="person" size={24} style={styles.icon} />
            <Text style={[styles.buttonText, styles.memberButtonText]}>
              PT 회원으로 시작하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            style={[
              styles.button,
              styles.managerButton,
              { marginBottom: insets.bottom },
            ]}
            onPress={() => login({ userMode: "manager" })}
          >
            <MaterialIcons
              name="fitness-center"
              size={24}
              style={styles.icon}
            />
            <Text style={[styles.buttonText, styles.managerButtonText]}>
              PT 트레이너로 시작하기
            </Text>
          </TouchableOpacity>
        </View>
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
  },
  memberButton: {
    backgroundColor: themeColor.action.primary,
    marginBottom: 16,
  },
  managerButton: {
    borderWidth: 1,
    borderColor: themeColor.action.primary,
    backgroundColor: themeColor.background.primary,
  },
  buttonText: {
    fontSize: typo.sizes.bodyLarge,
    fontWeight: typo.weights.bold,
    textAlign: "center",
  },
  memberButtonText: {
    color: themeColor.text.primary,
  },
  managerButtonText: {
    color: themeColor.text.primary,
  },
  icon: {
    color: themeColor.text.primary,
  },
}));
