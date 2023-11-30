import BaseOfferProps, { BaseOfferPropsAttributes } from "./BaseOfferProps";

interface OfferSaleAttributes extends BaseOfferPropsAttributes {
  sale: number;
}

export default class OfferSale extends BaseOfferProps {
  readonly props: OfferSaleAttributes;

  protected constructor(props: OfferSaleAttributes, id?: string) {
    super(props, id);

    this.props = { ...super.getProps(), ...props };
  }

  protected getProps() {
    return this.props;
  }

  getMultiply() {
    return this.props.sale;
  }

  isAllMultiplyKeysMatched(attributes: BaseOfferProps) {
    return (
      this.getAmountOfAttributes() === attributes.getKeys().length &&
      this.getKeys().every((key) =>
        this.ifAttributeExists(key, attributes.getValue(key))
      )
    );
  }

  static create(props: OfferSaleAttributes, id?: string) {
    return new OfferSale(props, id);
  }
}
