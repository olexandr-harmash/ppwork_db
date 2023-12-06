import DomainOfferService from "../../core/model/OfferService";

export default class OfferServiceMap {
  static toDTO(model: DomainOfferService) {
    throw new Error("Method not implemented.");
  }
  static toDomain(model: any): DomainOfferService {
    return DomainOfferService.create(
      {
        name: model.OfferVariety.name,
        cost: model.cost,
        value: model.OfferVariety.value,
      },
      model.id
    );
  }
  static toPersistent(model: DomainOfferService): any {
    return {
      id: model.getId(),
      cost: model.getCost(),
    };
  }
}
