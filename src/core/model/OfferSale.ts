import Entity from "../Entity";
import OfferVariety from "./OfferVariety";

interface OfferSaleAttributes {
  varieties: OfferVariety[];
  sale: number;
}

export default class OfferSale extends Entity<OfferSaleAttributes> {
  protected constructor(props: OfferSaleAttributes, id?: string) {
    super(props, id);
  }

  protected getProps() {
    return this.props;
  }

  getSale() {
    return this.props.sale;
  }

  isVarietiesExist(attributes: OfferVariety[]) {
    return attributes.every((attribute) =>
      this.props.varieties.find((variety) => attribute.compare(variety))
    );
  }

  isAllSalesMatched(attributes: OfferVariety[]) {
    return this.props.varieties.every((variety) =>
      attributes.find((attribute) => variety.compare(attribute))
    );
  }

  static create(props: OfferSaleAttributes, id?: string) {
    return new OfferSale(props, id);
  }
}
