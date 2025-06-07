import { useChangeUserModeMutation } from "@features/user/useChangeUserModeMutation";
import { useGetUserSuspenseQuery } from "@features/user/useGetUserSuspenseQuery";
import { useLogoutMutation } from "@features/user/useLogoutMutation";
import { queryClient } from "@shared/queryClient/queryClient";
import { createStyle, useThemeStyle } from "@shared/ui/createStyle";
import { userModeMMKV } from "@shared/utils/userModeMMKV";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

function httpToHttps(url: string) {
  return url.replace("http://", "https://");
}

export default function MyScreen() {
  const styles = useThemeStyle(themedStyles);

  const router = useRouter();

  const { data } = useGetUserSuspenseQuery();
  const { name, picture, email } = data.user?.user_metadata || {};

  const [userMode] = userModeMMKV.useMMKV();

  const isManager = userMode === "manager";

  const { mutate: changeUserMode } = useChangeUserModeMutation({
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
      router.navigate("/");
      router.navigate("/login");
    },
  });

  return (
    <View style={styles.block}>
      <View>
        <View style={styles.header}>
          <Image
            source={{ uri: httpToHttps(picture || "") }}
            style={styles.image}
          />
          <View>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>안녕하세요 </Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.title}>님</Text>
            </View>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <Text style={styles.userMode}>
          현재{" "}
          <Text style={styles.userModeStrong}>
            {isManager ? "트레이너" : "회원"}
          </Text>
          으로 로그인중이에요.
        </Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            changeUserMode({ userMode: isManager ? "member" : "manager" })
          }
          activeOpacity={0.3}
          style={styles.bottomButton}
        >
          <Text style={styles.bottomButtonText}>
            {isManager ? "회원으로" : "트레이너로"} 전환하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logout()}
          activeOpacity={0.3}
          style={styles.bottomButton}
        >
          <Text style={styles.bottomButtonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  block: {
    backgroundColor: themeColor.background.primary,
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    gap: 16,
    flexDirection: "row",
    marginBottom: 16,
  },
  title: {
    fontSize: typo.sizes.h2,
    fontWeight: typo.weights.medium,
    color: themeColor.text.primary,
  },
  name: {
    fontSize: typo.sizes.h2,
    fontWeight: typo.weights.bold,
    color: themeColor.brand.primary,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  titleBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  email: {
    fontSize: typo.sizes.bodyMedium,
    fontWeight: typo.weights.regular,
    color: themeColor.text.tertiary,
  },
  userMode: {
    fontSize: typo.sizes.bodyMedium,
    fontWeight: typo.weights.regular,
    color: themeColor.text.tertiary,
    borderWidth: 1,
    borderColor: themeColor.border.light,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center",
  },
  userModeStrong: {
    fontWeight: typo.weights.bold,
    color: themeColor.text.primary,
  },
  bottomButtonContainer: {
    gap: 8,
  },
  bottomButton: {
    padding: 4,
    borderRadius: 4,
    alignSelf: "center",
  },
  bottomButtonText: {
    fontSize: typo.sizes.bodySmall,
    color: themeColor.text.tertiary,
    fontWeight: typo.weights.semiBold,
  },
}));
