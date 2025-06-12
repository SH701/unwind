export const PASSWORD_MIN_LENGTH=4;
export const PASSWORD_REGEX=new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
  );
export const PASSWORD_ERROR ="비밀번호는 소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다."
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds}초 전`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}