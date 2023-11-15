import { load } from "https://deno.land/std@0.200.0/dotenv/mod.ts";
import { z } from "zod";

const EnvSchema = z.object({
  ENV: z.enum(["dev", "prod", "qa"]).default("dev"),
  PORT: z.coerce.number().int().nonnegative().default(8000),
});

// Load env variable
export const env = EnvSchema.parse(await load({ allowEmptyValues: true }));
