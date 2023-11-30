import Entity from "../Entity";
import BaseOfferProps from "./BaseOfferProps";

export interface BaseOfferDataAttributes {
  name: string;
  cost: number;
  offers: BaseOfferProps[];
}

export default abstract class BaseOfferData extends Entity<BaseOfferDataAttributes> {
  protected constructor(props: BaseOfferDataAttributes, id?: string) {
    super(props, id);
  }

  protected getMatchedOffers(attributes: BaseOfferProps) {
    const existedCosts = this.props.offers.filter((offer) =>
      attributes
        .getKeys()
        .find((key) => offer.ifAttributeExists(key, attributes.getValue(key)))
    );
    return existedCosts;
  }

  protected getUuid(): string {
    return this.id.getStringValue();
  }

  protected getProps() {
    return this.props;
  }
}
