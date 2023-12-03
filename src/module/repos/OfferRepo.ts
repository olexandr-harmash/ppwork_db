import { Op, Sequelize } from "sequelize";
import Offer from "../../core/model/Offer";
import OfferVariety from "../../core/model/OfferVariety";
import OfferRepo from "../OfferRepo";
import OfferMap from "../mapper/OfferMap";
import OfferSaleMap from "../mapper/OfferSaleMap";
import OfferVarietyMap from "../mapper/OfferVarietyMap";

export default class OfferRepoImpl implements OfferRepo {
  private models: any;
  private sequelize: Sequelize;

  constructor(models: any, sequelize: Sequelize) {
    this.models = models;
    this.sequelize = sequelize;
  }

  async create(offer: Offer): Promise<void> {
    const OfferModel = this.models.Offer;
    const OfferSale = this.models.OfferSale;
    const OfferVariety = this.models.OfferVariety;

    const offerId = offer.getId();

    try {
      await this.sequelize.transaction(async (t) => {
        await OfferModel.create(OfferMap.toPersistent(offer));

        const varietiesPromises = offer.getVarieties().map(async (variety) => {
          const persistent = OfferVarietyMap.toPersistent(variety);
          persistent.offer_id = offerId;
          await OfferVariety.create(persistent, { transaction: t });
        });

        const salesPromises = offer.getSales().map(async (sale) => {
          let persistent = OfferSaleMap.toPersistent(sale);
          persistent.offer_id = offerId;
          const saleModel = await OfferSale.create(persistent);

          const saleVarietiesPromises = sale
            .getVarieties()
            .map(async (variety) =>
              saleModel.setOfferVarieties(variety.getId())
            );

          await Promise.all(saleVarietiesPromises);
        });

        await Promise.all([...varietiesPromises, ...salesPromises]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getByVariety(varities: OfferVariety[]): Promise<Offer[]> {
    const OfferModel = this.models.Offer;
    const OfferSale = this.models.OfferSale;
    const OfferVariety = this.models.OfferVariety;
    const SaleVariety = this.models.SaleVariety;

    const rawSequilize = await OfferModel.findAll({
      include: [
        {
          model: OfferVariety,
        },
        {
          model: OfferSale,
          include: OfferVariety,
        },
      ],
      raw: false,
    });

    return rawSequilize.map((raw) => OfferMap.toDomain(raw));
  }
}
