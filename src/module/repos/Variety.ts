import { Op } from "sequelize";
import Variety from "../../core/model/Veriety";
import VarietyMap from "../mapper/Variety";
import Uuid from "../../core/Uuid";

export default class VarietyRepoImpl {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async create(variety: Variety) {
    const model = this.models.Variety;
    const persistent = VarietyMap.toPersistent(variety);
    await model.create(persistent);
  }

  async findByPk(pk: Uuid) {
    const model = this.models.Variety;
    const variety = await model.findByPk(pk.getStringValue());
    return VarietyMap.toDomain(variety);
  }

  async findByPks(pks: Uuid[]) {
    const model = this.models.Variety;
    const varieties = await model.findAll({
      where: { id: { [Op.in]: pks.map((pk) => pk.getStringValue()) } },
      raw: false,
    });
    return varieties.map((v) => VarietyMap.toDomain(v));
  }
}
