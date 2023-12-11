import Entity from "../Entity";
import OfferService from "./OfferService";
import OfferVariety from "./OfferVariety";

export interface BaseOfferDataAttributes {
  name: string;
  cost: number;
  imgUrls: string[];
  services: OfferService[];
  varieties: OfferVariety[];
}

export default abstract class BaseOfferData extends Entity<BaseOfferDataAttributes> {
  protected constructor(props: BaseOfferDataAttributes, id?: string) {
    super(props, id);
  }

  protected getMatchedVarieties(attributes: OfferVariety[]) {
    const existedCosts = this.props.varieties.filter((variety) =>
      attributes.find((attribute) => variety.compare(attribute))
    );
    return existedCosts;
  }

  protected getMatchedServices(attributes: OfferVariety[]) {
    const existedCosts = this.props.services.filter((variety) =>
      attributes.find((attribute) => variety.compare(attribute))
    );
    return existedCosts;
  }

  public getName() {
    return this.props.name;
  }

  public getImgUrls() {
    return this.props.imgUrls;
  }

  public getCost() {
    return this.props.cost;
  }

  public getServices() {
    return this.props.services;
  }

  public getId() {
    return this.id.getStringValue();
  }

  protected getUuid(): string {
    return this.id.getStringValue();
  }

  protected getProps() {
    return this.props;
  }

  public setName(name: string) {
    this.props.name = name;
  }

  public setImgUrls(urls: string[]) {
    this.props.imgUrls = urls;
  }

  public setCost(cost: number) {
    this.props.cost = cost;
  }

  public addVariety(variety: OfferVariety) {
    this.props.varieties.push(variety);
  }

  public addService(service: OfferService) {
    this.props.services.push(service);
  }
}
