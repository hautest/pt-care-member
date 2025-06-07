import { z } from "zod";
import { createMMKVSchema } from "./mmkv";

export const userModeMMKV = createMMKVSchema({
  key: "userMode",
  value: z.enum(["member", "manager"]),
});
