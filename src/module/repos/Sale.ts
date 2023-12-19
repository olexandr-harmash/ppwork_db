import { Op } from "sequelize";
import Sale from "../../core/model/Sale";
import SaleMap from "../mapper/Sale";

export default class SaleRepoImpl {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async create(sale: Sale, offerId: string) {
    const model = this.models.Sale;
    const assosiation = this.models.SaleToVariety;

    const persistent = SaleMap.toPersistent(sale);
    persistent.offer_id = offerId;

    const assosiationPersistent = sale
      .getVarieties()
      .map((v) => ({ sale_id: sale.getId(), variety_id: v.getId() }));

    await model.create(persistent);
    await assosiation.bulkCreate(assosiationPersistent);
  }

  async bulkCreate(sale: Sale[], offerId: string) {
    await Promise.all(sale.map((s) => this.create(s, offerId)));
  }
}
