export const buildSearchQuery = (
  search,
  fields
) => {
  if (!search) return {};

  return {
    $or: fields.map((field) => ({
      [field]: {
        $regex: search,
        $options: "i"
      }
    }))
  };
};