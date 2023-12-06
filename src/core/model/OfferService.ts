import Entity from "../Entity";
import OfferVariety, { OfferVarietyAttributes } from "./OfferVariety";

export interface OfferServiceAttributes extends OfferVarietyAttributes {
  cost: number;
}

export default class OfferService extends OfferVariety {
  protected props: OfferServiceAttributes;
  protected constructor(props: OfferServiceAttributes, id?: string) {
    super(props);

    this.props = { ...props };
  }

  getCost() {
    return this.props.cost;
  }

  protected getProps() {
    return this.props;
  }

  static create(props: OfferServiceAttributes, id?: string) {
    return new OfferService(props, id);
  }
}
