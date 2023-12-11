import { CreateOfferDto } from "../../dto/OfferDto";

export function CreateOffer() {
  return async (req, res, next) => {
    try {
      const createDto: CreateOfferDto = req.body;

      req.offerData = {
        varietiesData: JSON.parse(JSON.parse(createDto.varieties)),
        servicesData: JSON.parse(JSON.parse(createDto.services)),
        salesData: JSON.parse(JSON.parse(createDto.sales)),
      };

      next(null, req, res);
    } catch (error) {
      next(error);
    }
  };
}
