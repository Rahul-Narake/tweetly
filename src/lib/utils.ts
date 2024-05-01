import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserId(path: string) {
  const numbersArray = path.match(/\d+/g);
  if (!numbersArray) {
    return null;
  }
  const numbers = numbersArray.map(Number);
  return numbers[0];
}
