import Entity from "../Entity";

export interface BaseOfferPropsAttributes {
    attributes: {
      [key: string]: string;
    };
}

export default abstract class BaseOfferProps extends Entity<BaseOfferPropsAttributes> {
  protected constructor(props: BaseOfferPropsAttributes, id?: string) {
    super(props, id);
  }

  protected getProps() {
    return this.props;
  }

  getKey() {
    return Object.keys(this.props.attributes)[0];
  }

  getValue(key: string) {
    return this.props.attributes[key];
  }

  getAttributes() {
    return this.props.attributes;
  }

  getAmountOfAttributes() {
    return Object.keys(this.props.attributes).length;
  }

  ifAttributeExists(key: string, value: string) {
    const attributeValue = this.props.attributes[key];

    const KeyDoNotExists = !attributeValue;

    if (KeyDoNotExists) {
      return false;
    }

    const isSameValue = attributeValue === value;

    if (isSameValue) {
      return true;
    }
  }

  getKeys() {
    return Object.keys(this.props.attributes);
  }
}
