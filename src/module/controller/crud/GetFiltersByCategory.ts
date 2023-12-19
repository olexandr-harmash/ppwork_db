import CategoryMap from "../../mapper/Category";
import OfferControllerImp from "../OfferController";

export function GetFiltersByCategory(this: OfferControllerImp) {
  return async (req, res) => {
    try {
      const filters = await this.categoryRepo.getByPk(req.params.category);

      return this.ok(res, CategoryMap.toDTO(filters));
    } catch (error) {
      return this.fail(res, error);
    }
  };
}
