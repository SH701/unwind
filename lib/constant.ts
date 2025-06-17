export const PASSWORD_MIN_LENGTH=4;
export const PASSWORD_REGEX=new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
  );
export const PASSWORD_ERROR ="비밀번호는 소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다."
export function formatTimeAgo(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}