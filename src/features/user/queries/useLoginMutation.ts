import { login } from "@react-native-seoul/kakao-login";
import { supabase } from "@shared/supabase/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLoginMutation = (
  options?: UseMutationOptions<{ user: User; session: Session }, unknown>
) =>
  useMutation({
    mutationFn: async () => {
      const { idToken } = await login();
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "kakao",
        token: idToken,
      });

      if (data.user) {
        await supabase.from("MANAGER").insert({
          id: data.user.id,
        });
      }

      if (error) throw error;

      return data;
    },
    ...options,
  });
