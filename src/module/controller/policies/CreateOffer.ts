import { CreateOfferDto } from "../../dto/OfferDto";

export function CreateOffer() {
  return async (req, res, next) => {
    try {
      const {varieties, sales} = req.body;

      req.offerData = {
        varietiesIds: JSON.parse(JSON.parse(varieties)),
        sales: JSON.parse(JSON.parse(sales)),
      };

      next(null, req, res);
    } catch (error) {
      next(error);
    }
  };
}
