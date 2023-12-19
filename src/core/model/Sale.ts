import Entity from "../Entity";
import Variety from "./Veriety";

interface SaleAttributes {
  multiply: number;
  varieties: Variety[];
}

export default class Sale extends Entity<SaleAttributes> {
  protected constructor(props: SaleAttributes, id?: string) {
    super(props, id);
  }

  protected getProps() {
    return this.props;
  }

  getMultiply() {
    return this.props.multiply;
  }

  getVarieties() {
    return this.props.varieties;
  }

  isVarietiesExist(attributes: Variety[]) {
    return attributes.every((attribute) =>
      this.props.varieties.find((variety) => attribute.compare(variety))
    );
  }

  isAllSalesMatched(attributes: Variety[]) {
    return this.props.varieties.every((variety) =>
      attributes.find((attribute) => variety.compare(attribute))
    );
  }

  static create(props: SaleAttributes, id?: string) {
    return new Sale(props, id);
  }
}
