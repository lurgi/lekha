/**
 * 조건부 클래스명을 결합하는 유틸리티 함수
 * @param classes - 클래스명 배열 (undefined, null, false 값은 무시됨)
 * @returns 결합된 클래스명 문자열
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
