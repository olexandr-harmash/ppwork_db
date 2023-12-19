import Sale from "../../core/model/Sale";
import { SaleOutput } from "../../db/model/Sale";
import VarietyMap from "./Variety";

export default class SaleMap {
  static toDTO(model: Sale) {
    throw new Error("Method not implemented.");
  }
  static toDomain(model: SaleOutput): Sale {
    return Sale.create(
      {
        varieties: model.Varieties.map((variety) =>
          VarietyMap.toDomain(variety)
        ),
        multiply: model.multiply,
      },
      model.id
    );
  }
  static toPersistent(model: Sale): any {
    return {
      id: model.getId(),
      multiply: model.getMultiply(),
    };
  }
}
