import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Object형태의 데이터를 입력받아 searchParam으로 변환한다.
export const objectToSearchParams = (obj: { [key: string]: string | number }) =>
  `?${Object.entries(obj)
    .map(([key, val]) => (typeof val !== undefined ? `${key}=${val}` : false))
    .filter(Boolean)
    .join('&')}`;

/**
 *
 * KST를 입력받아 UTC로 반환
 */
export const kstToUtc = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 9));
