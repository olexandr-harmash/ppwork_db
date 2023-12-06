import { Op, Sequelize } from "sequelize";
import Offer from "../../core/model/Offer";
import OfferVariety from "../../core/model/OfferVariety";
import OfferRepo from "../OfferRepo";
import OfferMap from "../mapper/OfferMap";
import OfferSaleMap from "../mapper/OfferSaleMap";
import OfferVarietyMap from "../mapper/OfferVarietyMap";
import OfferServiceMap from "../mapper/OfferService";
import OfferService from "../../db/model/OfferService";

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

        const persistentVarieties = offer.getVarieties().map((variety) => {
          const persistent = OfferVarietyMap.toPersistent(variety);
          persistent.offer_id = offerId;
          return persistent;
        });

        const varietyResults = await OfferVariety.bulkCreate(
          persistentVarieties,
          { transaction: t }
        );

        const persistentServices = offer.getServices().map((service) => {
          const persistent = OfferVarietyMap.toPersistent(service);
          persistent.offer_id = offerId;
          return persistent;
        });

        const serviceResults = await OfferVariety.bulkCreate(
          persistentServices,
          { transaction: t }
        );

        const persistentServicesCost = offer.getServices().map((service, i) => {
          const persistent = OfferServiceMap.toPersistent(service);
          persistent.offer_id = offerId;
          persistent.offer_variety_id = serviceResults[i].id;
          return persistent;
        });

        const servicesCostResults = await OfferService.bulkCreate(
          persistentServicesCost,
          { transaction: t }
        );

        const persistentSales = offer.getSales().map((sale) => {
          const persistent = OfferSaleMap.toPersistent(sale);
          persistent.offer_id = offerId;
          return persistent;
        });

        const saleResults = await OfferSale.bulkCreate(persistentSales, {
          transaction: t,
        });

        saleResults.map(async (result, i) => {
          const varietyIds = offer
            .getSales()
            [i].getVarieties()
            .map((variety) => variety.getId());

          varietyIds.map((id) => result.setOfferVarieties(id));
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getByVariety(varities: OfferVariety[]): Promise<Offer[]> {
    const OfferModel = this.models.Offer;
    const OfferSale = this.models.OfferSale;
    const OfferVariety = this.models.OfferVariety;
    const OfferService = this.models.OfferService;

    const rawSequilize = await OfferModel.findAll({
      include: [
        {
          model: OfferService,
          include: OfferVariety,
        },
        {
          model: OfferVariety,
          where: {
            value: {
              [Op.in]: varities.map((variety) => variety.getValue()),
            },
          },
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
