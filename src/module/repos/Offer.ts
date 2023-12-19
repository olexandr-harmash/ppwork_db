import { Op } from "sequelize";
import Offer from "../../core/model/Offer";
import OfferMap from "../mapper/Offer";
import SaleRepoImpl from "./Sale";
import { OfferFilters, OfferOptions, SeachResult } from "../OfferRepo";

export default class OfferRepoImpl {
  private models: any;
  private saleRepo: SaleRepoImpl;

  constructor(models: any, saleRepo: SaleRepoImpl) {
    this.models = models;
    this.saleRepo = saleRepo;
  }

  private baseQuery(): any {
    const SaleModel = this.models.Sale;
    const VarietyModel = this.models.Variety;

    return {
      distinct: true,
      include: [
        {
          model: VarietyModel,
        },
        {
          model: SaleModel,
          include: VarietyModel,
        },
      ],
      raw: false,
    };
  }

  async create(offer: Offer) {
    const model = this.models.Offer;
    const assosiation = this.models.OfferToVariety;

    const persistent = OfferMap.toPersistent(offer);
    const assosiationPersistent = offer
      .getVarieties()
      .map((v) => ({ offer_id: offer.getId(), variety_id: v.getId() }));

    await model.create(persistent);
    await assosiation.bulkCreate(assosiationPersistent);

    await this.saleRepo.bulkCreate(offer.getSales(), offer.getId());
  }

  async getByFilters(
    filters: OfferFilters,
    options: OfferOptions
  ): Promise<SeachResult> {
    const OfferModel = this.models.Offer;

    const { limit, page } = options;

    const query = this.baseQuery();
    query.limit = limit;
    query.offset = page ? page * limit : 0;
    query.include[0].where = filters.varieties.length && {
      id: {
        [Op.in]: filters.varieties.map((id) => id.getStringValue()),
      },
    };

    const rawSequilize = await OfferModel.findAndCountAll(query);
    console.log(rawSequilize)
    return {
      offers: rawSequilize.rows.map((raw) => OfferMap.toDomain(raw)),
      amount: rawSequilize.count,
      limit,
      page,
    };
  }
}
