import { buildProfileImageUrl } from "./utils";

export async function uploadImageToCloudflare(file: File): Promise<string | null> {
  const apiKey = process.env.CLOUDFLARE_API_KEY!;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("requireSignedURLs", "false");

  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  const result = await res.json();

  if (!result.success) {
    console.error("Cloudflare upload failed", result);
    return null;
  }

  // fileId로 이미지 URL 만들기
  return buildProfileImageUrl(result.result.id); // 너가 만든 URL 함수 활용
}
