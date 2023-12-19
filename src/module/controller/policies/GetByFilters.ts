import * as JSURL from "jsurl";

export function GetByFiltersPolicy() {
  return async (req, res, next) => {
    try {
      const query = req.query;

      const filters: any = JSURL.parse(query.filters);

      const type = filters.type;
      const price = filters.price;

      delete filters.type;
      delete filters.price;

      req.filters = {
        varieties: Object.keys(filters).reduce(
          (acc, prev) => acc.concat(filters[prev]),
          []
        ),
        page: +query.page,
        limit: +query.limit,
      };
      console.log(req.filters)
      next(null, req, res);
    } catch (error) {
      next(error);
    }
  };
}
