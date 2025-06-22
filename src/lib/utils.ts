import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * function is a Tailwind CSS helper. It's used to combine multiple class names
 * into a single string, while automatically removing conflicting Tailwind classes.
 *
 * Uses `clsx` to handle conditional logic and `tailwind-merge` to resolve
 * Tailwind class name conflicts (e.g., `p-2 p-4` becomes `p-4`).
 *
 * @param {...ClassValue[]} inputs - Class names or conditional class values to combine.
 * @returns {string} A single class string with conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
