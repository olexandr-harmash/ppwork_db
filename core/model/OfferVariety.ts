import BaseOfferProps, { BaseOfferPropsAttributes } from "./BaseOfferProps";

interface OfferVarietyAttributes extends BaseOfferPropsAttributes {}

export default class OfferVariety extends BaseOfferProps {
  readonly props: OfferVarietyAttributes;

  protected constructor(props: OfferVarietyAttributes, id?: string) {
    super(props, id);

    this.props = { ...super.getProps(), ...props };
  }

  protected getProps() {
    return this.props;
  }

  static create(props: OfferVarietyAttributes, id?: string) {
    return new OfferVariety(props, id);
  }
}
