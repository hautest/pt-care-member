import { supabase } from "@shared/supabase/supabase";
import { useSuspenseQuery } from "@tanstack/react-query";

const QUERY_KEY = ["user"];

export const useGetUserSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data;
    },
  });

useGetUserSuspenseQuery.queryKey = QUERY_KEY;
