import { supabase } from "@shared/supabase/supabase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useGetUserSuspenseQuery } from "./useGetUserSuspenseQuery";
import { userModeMMKV } from "@shared/utils/userModeMMKV";

export const useChangeUserModeMutation = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    { userMode: "member" | "manager" }
  >
) => {
  const { data: user } = useGetUserSuspenseQuery();

  return useMutation({
    mutationFn: async ({ userMode }: { userMode: "member" | "manager" }) => {
      const userModeUpperCase = userMode.toUpperCase() as "MANAGER" | "MEMBER";

      const { data } = await supabase.from(userModeUpperCase).insert({
        id: user.user?.id || "",
      });

      userModeMMKV.setValue(userMode);

      return data;
    },
  });
};
