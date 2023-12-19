import Uuid from "../../../core/Uuid";
import { FindOfferByFilters } from "../../dto/OfferDto";
import CertainItemMap from "../../mapper/CertainItemMap";

import OfferControllerImp from "../OfferController";

async function getByFilters(req) {
  console.log(req.filters.varieties)
  const varieties = req.filters.varieties.map((id) => new Uuid(id));

  req.varieties = await this.varietyRepo.findByPks(varieties);

  return await this.offerRepo.getByFilters(
    {
      varieties: varieties,
    },
    { limit: req.query.limit, page: req.query.page }
  );
}

function painationResult(limit, page, amount) {
  return { next: (page + 1) * limit <= amount, limit, page, amount };
}

export function GetByFilters(this: OfferControllerImp) {
  return async (req, res) => {
    try {
      const dto = req.body as FindOfferByFilters;

      const { limit, page, amount, offers } = await getByFilters.bind(this)(
        dto
      );

      return this.ok(res, {
        ...painationResult(limit, page, amount),
        offers,
      });
    } catch (error) {
      return this.fail(res, error);
    }
  };
}

export function GetCertainByFilters(this: OfferControllerImp) {
  return async (req, res) => {
    try {
      const { limit, page, amount, offers } = await getByFilters.bind(this)(
        req
      );

      return this.ok(res, {
        ...painationResult(limit, page, amount),
        items: offers.map((offer) =>
          CertainItemMap.toDTO(offer.devideByAttributes(req.varieties))
        ),
      });
    } catch (error) {
      return this.fail(res, error);
    }
  };
}
