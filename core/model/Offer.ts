import BaseOfferData, { BaseOfferDataAttributes } from "./BaseOfferData";
import BaseOfferProps from "./BaseOfferProps";
import CertainItem from "./CertainItem";
import OfferService from "./OfferServices";
import OfferSale from "./OfferSales";

export interface OfferAttributes extends BaseOfferDataAttributes {
  services: OfferService[];
  sales: OfferSale[];
}

/**
 * Class representing an offer.
 *
 * @extends BaseOfferData
 */
export default class Offer extends BaseOfferData {
  /**
   * Maps to store attributes for sales and services.
   *
   * @type {Object.<string, string[]>}
   */
  public readonly salesMap: { [key: string]: string[] };
  /**
   * Maps to store attributes for services.
   *
   * @type {Object.<string, string[]>}
   */
  public readonly servicesMap: { [key: string]: string[] };

  /**
   * Properties specific to the Offer class.
   *
   * @type {OfferAttributes}
   */
  readonly props: OfferAttributes;

  /**
   * Constructor for the Offer class.
   *
   * @param {OfferAttributes} props - The attributes for the Offer.
   * @param {string} [id] - The unique identifier of the Offer.
   */
  protected constructor(props: OfferAttributes, id?: string) {
    super(props, id);

    this.props = {
      ...super.getProps(),
      ...props,
    };

    this.salesMap = this.getPropsMap(props.sales);
    this.servicesMap = this.getPropsMap(props.services);
  }

  /**
   * Override the getProps method from the base class.
   *
   * @returns {OfferAttributes} The properties of the Offer.
   */
  protected getProps() {
    return this.props;
  }

  /**
   * Factory method to create an instance of the Offer class.
   *
   * @param {OfferAttributes} props - The attributes for the Offer.
   * @param {string} [id] - The unique identifier of the Offer.
   * @returns {Offer} The created Offer instance.
   */
  static create(props: OfferAttributes, id?: string) {
    return new Offer(props, id);
  }

  /**
   * Private method to get costs that match provided attributes.
   *
   * @param {BaseOfferProps} attributes - The attributes to match.
   * @returns {OfferService[]} Array of services that match the provided attributes.
   * @private
   */
  private getMatchedCosts(attributes: BaseOfferProps) {
    const existedCosts = this.props.services.filter((cost) =>
      attributes
        .getKeys()
        .find((key) => cost.ifAttributeExists(key, attributes.getValue(key)))
    );
    return existedCosts;
  }

  /**
   * Private method to get multipliers that match provided attributes.
   *
   * @param {BaseOfferProps} attributes - The attributes to match.
   * @returns {OfferSale | undefined} The multiplier that matches the provided attributes, if any.
   * @private
   */
  private getMatchedMultiplies(attributes: BaseOfferProps) {
    const existedMultiply = this.props.sales.find((multiply) =>
      multiply.isAllMultiplyKeysMatched(attributes)
    );

    return existedMultiply;
  }

  /**
   * Private method to create a map of attributes for sales or services.
   *
   * @param {BaseOfferProps[]} withAttr - Array of BaseOfferProps to create a map from.
   * @returns {Object.<string, string[]>} A map of attributes.
   * @private
   */
  private getPropsMap(withAttr: BaseOfferProps[]) {
    return withAttr.reduce<{ [key: string]: string[] }>((prev, curr) => {
      const key = curr.getKeys()[0];

      if (!prev[key]) {
        prev[key] = [];
      }

      prev[key].push(curr.getAttributes()[key]);

      return prev;
    }, {});
  }

  /**
   * Public method to get a map of sales attributes.
   *
   * @returns {Object.<string, string[]>} A map of sales attributes.
   */
  public getOfferMap() {
    return this.salesMap;
  }

  /**
   * Public method to get a map of service attributes.
   *
   * @returns {Object.<string, string[]>} A map of service attributes.
   */
  public getCostsMap() {
    return this.servicesMap;
  }

  /**
   * Public method to divide the offer into a CertainItem based on provided attributes.
   *
   * @param {BaseOfferProps} attributes - The attributes to divide by.
   * @returns {CertainItem} The created CertainItem instance.
   */
  public devideByAttributes(attributes: BaseOfferProps) {
    const existedCosts = this.getMatchedCosts(attributes);
    const existedOffer = this.getMatchedOffers(attributes);
    const existedMultiply = this.getMatchedMultiplies(attributes);

    return CertainItem.create(
      {
        cost: this.props.cost,
        name: this.props.name,
        offers: existedOffer,
        propCosts: existedCosts,
        sale: existedMultiply,
      },
      this.getUuid()
    );
  }
}
