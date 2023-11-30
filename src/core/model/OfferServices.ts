import BaseOfferProps, { BaseOfferPropsAttributes } from "./BaseOfferProps";

interface OfferServiceAttributes extends BaseOfferPropsAttributes {
  cost: number;
}

export default class OfferService extends BaseOfferProps {
  readonly props: OfferServiceAttributes;

  protected constructor(props: OfferServiceAttributes, id?: string) {
    super(props, id);

    this.props = { ...super.getProps(), ...props };
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
