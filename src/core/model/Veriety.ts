import Entity from "../Entity";
import Uuid from "../Uuid";

export interface VarietyAttributes {
  name: string;
  value: string;
  additionalCost: number | null;
  multiplyCost: number | null;
}

export default class Variety extends Entity<VarietyAttributes> {
  protected constructor(props: VarietyAttributes, id?: string) {
    super(props, id);
  }

  getName() {
    return this.props.name;
  }

  getValue() {
    return this.props.value;
  }

  getAdditionalCost() {
    return this.props.additionalCost;
  }

  getMultiplyCost() {
    return this.props.multiplyCost;
  }

  protected getProps() {
    return this.props;
  }

  compare(variety: Variety) {
    return (
      this.getName() === variety.getName() &&
      this.getValue() === variety.getValue()
    );
  }

  static create(props: VarietyAttributes, id?: string) {
    return new Variety(props, id);
  }
}
