import { z } from "zod";

// 환경변수 스키마 정의
const envSchema = z.object({
  ACCOUNT_HASH:          z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_API_KEY:    z.string(),
});

// process.env 파싱 (parse는 raw 값을 직접 반환합니다)
export const env = envSchema.parse(process.env);



// Cloudflare Images delivery host 생성
export const CLOUDFLARE_IMAGES_HOST = `https://imagedelivery.net/${env.ACCOUNT_HASH}`;

export function buildProfileImageUrl(fileId: string): string {
  return `${CLOUDFLARE_IMAGES_HOST}/${fileId}/public`
}
