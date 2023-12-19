import Entity from "../Entity";
import Variety from "./Veriety";

export interface BaseGoodDataAttributes {
  name: string;
  cost: number;
  imgUrls: string[];
  varieties: Variety[];
}

export default abstract class BaseGoodData extends Entity<BaseGoodDataAttributes> {
  protected constructor(props: BaseGoodDataAttributes, id?: string) {
    super(props, id);
  }

  protected getMatchedVarieties(attributes: Variety[]) {
    const existedCosts = this.props.varieties.filter((variety) =>
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

  public addVariety(variety: Variety) {
    this.props.varieties.push(variety);
  }
}
