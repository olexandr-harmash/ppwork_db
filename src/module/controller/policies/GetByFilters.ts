export function GetByFiltersPolicy() {
  return async (req, res, next) => {
    try {
      const query = req.query;
      req.filters = {
        varieties: JSON.parse(JSON.parse(query.varieties)),
        page: +query.page,
        limit: +query.limit,
      }
      next(null, req, res);
    } catch (error) {
      next(error);
    }
  };
}
