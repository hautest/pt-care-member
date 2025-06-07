import { login } from "@react-native-seoul/kakao-login";
import { supabase } from "@shared/supabase/supabase";
import { userModeMMKV } from "@shared/utils/userModeMMKV";
import { Session, User } from "@supabase/supabase-js";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLoginMutation = (
  options?: UseMutationOptions<
    { user: User; session: Session },
    unknown,
    { userMode: "member" | "manager" }
  >
) =>
  useMutation({
    mutationFn: async ({ userMode }) => {
      const { idToken } = await login();
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "kakao",
        token: idToken,
      });

      userModeMMKV.setValue(userMode);

      const userId = data.user?.id;
      const userModeToUpperCase = userMode.toUpperCase() as
        | "MANAGER"
        | "MEMBER";

      if (userId) {
        await supabase.from(userModeToUpperCase).insert({
          id: userId,
        });
      }

      if (error) throw error;

      return data;
    },
    ...options,
  });
