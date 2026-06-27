export const buildPagination = (
  page,
  limit
) => {
  const currentPage =
    Number(page) || 1;

  const perPage =
    Number(limit) || 10;

  return {
    skip:
      (currentPage - 1) *
      perPage,
    limit: perPage
  };
};