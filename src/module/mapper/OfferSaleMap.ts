import DomainOfferSale from "../../core/model/OfferSale";
import OfferVarietyMap from "./OfferVarietyMap";

export default class OfferSaleMap {
  static toDTO(model: DomainOfferSale) {
    throw new Error("Method not implemented.");
  }
  static toDomain(model: any): DomainOfferSale {
    return DomainOfferSale.create(
      {
        varieties: model.OfferVarieties.map((variety) =>
          OfferVarietyMap.toDomain(variety)
        ),
        sale: model.multiply,
      },
      model.id
    );
  }
  static toPersistent(model: DomainOfferSale): any {
    return {
      id: model.getId(),
      multiply: model.getSale(),
    };
  }
}
