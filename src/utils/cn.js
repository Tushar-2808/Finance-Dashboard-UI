import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional Tailwind classes — combines clsx and tailwind-merge */
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};