// src/common/utils/extract-keys/extract-keys.ts

export const extractKeys = <T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> => {
  const result: Partial<Pick<T, K>> = {};
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result as Pick<T, K>;
};
