/**
 * Generates a random 4-digit connection code
 * @returns {string} A string containing 4 random digits
 */
export function generateCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
