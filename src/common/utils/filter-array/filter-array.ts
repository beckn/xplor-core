export const filterArrayOfObjects = (objects: any[], ids: string[]): any[] => {
  const idSet = new Set(ids); // Convert array of IDs to a Set for faster lookups
  return objects.filter((object) => idSet.has(object._id));
};
