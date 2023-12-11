import OfferVariety from "../../../core/model/OfferVariety";
import { FindOfferByFilters } from "../../dto/OfferDto";
import CertainItemMap from "../../mapper/CertainItemMap";
import OfferMap from "../../mapper/OfferMap";
import OfferControllerImp from "../OfferController";

async function getByFilters(dto) {
  const varieties = dto.varieties.map((variety) =>
    OfferVariety.create(variety)
  );

  dto.varieties = varieties;

  return await this.repo.getByFilters(
    {
      varieties: varieties,
    },
    { limit: dto.limit, page: dto.page }
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
        offers: offers.map((offer) => OfferMap.toDTO(offer)),
      });
    } catch (error) {
      return this.fail(res, error);
    }
  };
}

export function GetCertainByFilters(this: OfferControllerImp) {
  return async (req, res) => {
    try {
      console.log(req.filters)
      const dto = req.filters as FindOfferByFilters;

      const { limit, page, amount, offers } = await getByFilters.bind(this)(
        dto
      );

      return this.ok(res, {
        ...painationResult(limit, page, amount),
        items: offers.map((offer) =>
          CertainItemMap.toDTO(offer.devideByAttributes(dto.varieties))
        ),
      });
    } catch (error) {
      return this.fail(res, error);
    }
  };
}
