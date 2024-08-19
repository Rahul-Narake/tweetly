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

export function extractTime(dateString: Date) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: number) {
  return number.toString().padStart(2, '0');
}
