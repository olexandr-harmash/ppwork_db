import Variety from "../../core/model/Veriety";
import { VarietyAttributes, VarietyInput } from "../../db/model/Variety";

export default class VarietyMap {
  static toDTO(model: Variety): any {}

  static toDomain(model: VarietyAttributes): Variety {
    return Variety.create(
      {
        name: model.name,
        value: model.value,
        additionalCost: model.additional_cost,
        multiplyCost: model.multiply_cost,
      },
      model.id
    );
  }
  static toPersistent(model: Variety): VarietyInput {
    return {
      id: model.getId(),
      name: model.getName(),
      value: model.getValue(),
      additional_cost: model.getAdditionalCost(),
      multiply_cost: model.getMultiplyCost(),
    };
  }
}
