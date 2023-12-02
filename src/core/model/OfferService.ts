import OfferVariety, { OfferVarietyAttributes } from "./OfferVariety";

interface OfferServiceAttributes extends OfferVarietyAttributes {
  cost: number;
}

export default class OfferService extends OfferVariety {
  readonly props: OfferServiceAttributes;

  protected constructor(props: OfferServiceAttributes, id?: string) {
    super(props, id);

    this.props = { ...props };
  }

  protected getProps() {
    return this.props;
  }

  getCost() {
    return this.props.cost;
  }

  static create(props: OfferServiceAttributes, id?: string) {
    return new OfferService(props, id);
  }
}
