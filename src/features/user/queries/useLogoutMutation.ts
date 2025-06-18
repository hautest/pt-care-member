import { supabase } from "@shared/supabase/supabase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLogoutMutation = (options?: UseMutationOptions) =>
  useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return true;
    },
    ...options,
  });
