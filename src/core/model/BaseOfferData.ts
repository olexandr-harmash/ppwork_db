import Entity from "../Entity";
import OfferVariety from "./OfferVariety";

export interface BaseOfferDataAttributes {
  name: string;
  cost: number;
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

  public getName() {
    return this.props.name;
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
}
