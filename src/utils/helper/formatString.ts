export function CapitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function CapitalizeFirstLetterOfEachWord(str: string[]) {
  return str.map((word) => CapitalizeFirstLetter(word)).join(" ");
}
