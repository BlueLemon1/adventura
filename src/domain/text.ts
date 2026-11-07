/** Shared text normalization for matching localized names and identifiers. */
export function normalizeKey(value: string | undefined): string {
  return (value ?? '')
    .trim()
    .toLocaleLowerCase()
    .replace(/[ä]/g, 'ae')
    .replace(/[ö]/g, 'oe')
    .replace(/[ü]/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '')
}
