import DomainOffer from "../../core/model/Offer";
import { OfferAttributes } from "../../db/model/Offer";
import OfferSaleMap from "./OfferSaleMap";
import OfferServiceMap from "./OfferService";
import OfferVarietyMap from "./OfferVarietyMap";

export default class OfferMap {
  static toDTO(model: DomainOffer) {
    throw new Error("Method not implemented.");
  }
  static toDomain(model: any): DomainOffer {
    return DomainOffer.create(
      {
        name: model.name,
        cost: model.cost,
        sales: model.OfferSales.map((sale) => OfferSaleMap.toDomain(sale)),
        varieties: model.OfferVarieties.map((offer) => OfferVarietyMap.toDomain(offer)),
        services: model.OfferServices.map((service) => OfferServiceMap.toDomain(service)),
      },
      model.id
    );
  }
  static toPersistent(model: DomainOffer): any {
    return {
      id: model.getId(),
      name: model.getName(),
      cost: model.getCost(),
    };
  }
}
