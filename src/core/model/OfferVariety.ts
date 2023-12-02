export interface OfferVarietyAttributes {
  name: string;
  value: string;
}

export default class OfferVariety {
  readonly props: OfferVarietyAttributes;

  protected constructor(props: OfferVarietyAttributes, id?: string) {
    this.props = props;
  }

  getName() {
    return this.props.name;
  }

  getValue() {
    return this.props.value;
  }

  compare(variety: OfferVariety) {
    return (
      this.getName() === variety.getName() &&
      this.getValue() === variety.getValue()
    );
  }

  static create(props: OfferVarietyAttributes, id?: string) {
    return new OfferVariety(props, id);
  }
}
