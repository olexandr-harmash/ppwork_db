import DomainOffer from "../../core/model/Offer";
import { OfferDto } from "../dto/OfferDto";
import OfferSaleMap from "./OfferSaleMap";
import OfferServiceMap from "./OfferService";
import OfferVarietyMap from "./OfferVarietyMap";

export default class OfferMap {
  static toDTO(model: DomainOffer): OfferDto {
    return {
      id: model.getId(),
      varietyMap: model.getVarietyMap(),
      serviceMap: model.getServiceMap(),
    }
  }
  static toDomain(model: any): DomainOffer {
    return DomainOffer.create(
      {
        imgUrls: model.img_urls,
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
      img_urls: model.getImgUrls(),
    };
  }
}
