
import Offer from "../../core/model/Offer";
import SaleMap from "./Sale";
import VarietyMap from "./Variety";

export default class OfferMap {
  static toDTO(model: Offer): any {
    return {
      id: model.getId(),
      varietyMap: model.getVarietyMap(),
      serviceMap: model.getServiceMap(),
    }
  }
  static toDomain(model: any): Offer {
    return Offer.create(
      {
        imgUrls: model.img_urls,
        name: model.name,
        cost: model.cost,
        sales: model.Sales.map((sale) => SaleMap.toDomain(sale)),
        varieties: model.Varieties.map((offer) => VarietyMap.toDomain(offer)),
      },
      model.id
    );
  }
  static toPersistent(model: Offer): any {
    return {
      id: model.getId(),
      name: model.getName(),
      cost: model.getCost(),
      img_urls: model.getImgUrls(),
    };
  }
}
