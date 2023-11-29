export const checkIsValidString = (e: unknown): boolean =>
  Boolean(e) && typeof e === "string" && e.length > 0;
