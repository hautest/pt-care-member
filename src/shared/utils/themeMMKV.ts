import { z } from "zod";
import { createMMKVSchema } from "./mmkv";

export const themeMMKV = createMMKVSchema({
  key: "theme",
  value: z.enum(["light", "dark", "system"]),
  defaultValue: "system",
});
