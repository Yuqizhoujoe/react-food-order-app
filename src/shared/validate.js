const NUMERIC_PATTERN = /^\d*$/;
export const isEmpty = (value) => value.trim() === '';
export const isFiveChars = value => value.trim().length === 5 && NUMERIC_PATTERN.test(value.trim());
