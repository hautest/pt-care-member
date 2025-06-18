import { useGetUserSuspenseQuery } from "@features/user/queries/useGetUserSuspenseQuery";
import { useLogoutMutation } from "@features/user/queries/useLogoutMutation";
import { queryClient } from "@shared/queryClient/queryClient";
import { createStyle, useThemeStyle } from "@shared/ui/createStyle";
import { useGlobalLoading } from "@shared/ui/GlobalLoading";
import { useModal } from "@shared/ui/Modal";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

function httpToHttps(url: string) {
  return url.replace("http://", "https://");
}

export default function MyScreen() {
  const styles = useThemeStyle(themedStyles);

  const router = useRouter();

  const { startLoading, stopLoading } = useGlobalLoading();

  const { data } = useGetUserSuspenseQuery();
  const { name, picture, email } = data.user?.user_metadata || {};

  const { mutate: logout } = useLogoutMutation({
    onMutate: () => {
      startLoading();
    },
    onSettled: () => {
      stopLoading();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useGetUserSuspenseQuery.queryKey,
      });
      router.navigate("/");
      router.navigate("/login");
    },
  });

  const { showModal, hideModal } = useModal();

  const handleLogout = () => {
    showModal({
      title: "로그아웃",
      description: "정말 로그아웃하시겠습니까?",
      confirmText: "로그아웃",
      cancelText: "취소",
      onCancel: () => {
        hideModal();
      },
      onConfirm: () => {
        hideModal();
        logout();
      },
    });
  };

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
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={handleLogout}
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
