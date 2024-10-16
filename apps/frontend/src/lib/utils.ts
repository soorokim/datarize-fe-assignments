import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * object형태의 데이터를 입력받아 searchParam으로 변환한다.
 *
 * ex) { a: '123', b: '112'} => '?a=123&b=112'
 *
 * */

export const objectToSearchParams = (obj: { [key: string]: string | number }) =>
  `?${Object.entries(obj)
    .map(([key, val]) => (typeof val !== undefined ? `${key}=${val}` : false))
    .filter(Boolean)
    .join('&')}`;

/**
 * number형태의 데이터를 입력받아 '자리수 구분한 원' 문자열로 변환한다.
 *
 * ex) 1000000 => '100,000,000원'
 *
 * */
export const numberToWonString = (input: number) => input.toLocaleString() + '원';

/**
 *
 * KST를 입력받아 UTC로 반환
 */
export const kstToUtc = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 9));
