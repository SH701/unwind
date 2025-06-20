import { z } from "zod";
const envSchema = z.object({
  ACCOUNT_HASH:          z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_API_KEY:    z.string(),
});

export const env = envSchema.parse(process.env);

export const CLOUDFLARE_IMAGES_HOST = `https://imagedelivery.net/${env.ACCOUNT_HASH}`;

export function buildProfileImageUrl(fileId: string): string {
  return `${CLOUDFLARE_IMAGES_HOST}/${fileId}/public`
}
