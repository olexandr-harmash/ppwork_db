import Entity from "../Entity";

export interface OfferVarietyAttributes {
  cost: number;
  name: string;
  value: string;
}

export default class OfferVariety extends Entity<OfferVarietyAttributes> {
  protected constructor(props: OfferVarietyAttributes, id?: string) {
    super(props);
  }

  getCost() {
    return this.props.cost;
  }
  
  getName() {
    return this.props.name;
  }

  getValue() {
    return this.props.value;
  }

  protected getProps() {
    return this.props;
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
