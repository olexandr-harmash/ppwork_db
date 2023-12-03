import DomainOfferVariety from "../../core/model/OfferVariety";

export default class OfferVarietyMap {
  static toDTO(model: DomainOfferVariety) {
    throw new Error("Method not implemented.");
  }
  static toDomain(model: any): DomainOfferVariety {
    return DomainOfferVariety.create({
      cost: model.cost,
      name: model.name,
      value: model.value
    }, model.id)
  }
  static toPersistent(model: DomainOfferVariety): any {
    return {
      id: model.getId(),
      name: model.getName(),
      value: model.getValue(),
      cost: model.getCost(),
    }
  }
}
