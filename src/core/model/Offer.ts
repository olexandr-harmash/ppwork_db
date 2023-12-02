import BaseOfferData, { BaseOfferDataAttributes } from "./BaseOfferData";
import CertainItem from "./CertainItem";
import OfferService from "./OfferService";
import OfferSale from "./OfferSale";
import OfferVariety from "./OfferVariety";

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
  getOfferMap(): any {
    throw new Error("Method not implemented.");
  }
  getCostsMap(): any {
    throw new Error("Method not implemented.");
  }
  /**
   * Maps to store attributes for sales and services.
   *
   * @type {Object.<string, string[]>}
   */
  public readonly serviceMap: { [key: string]: string[] };
  /**
   * Maps to store attributes for services.
   *
   * @type {Object.<string, string[]>}
   */
  public readonly varietyMap: { [key: string]: string[] };

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

    this.serviceMap = this.getPropsMap(props.services);
    this.varietyMap = this.getPropsMap(props.varieties);
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
  private getMatchedServices(attributes: OfferVariety[]) {
    const existedCosts = this.props.services.filter((service) =>
      attributes.find((attribute) => service.compare(attribute))
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
  private getMatchedSales(attributes: OfferVariety[]) {
    return this.props.sales.find((sale) => sale.isAllSalesMatched(attributes));
  }

  /**
   * Private method to create a map of attributes for sales or services.
   *
   * @param {BaseOfferProps[]} withAttr - Array of BaseOfferProps to create a map from.
   * @returns {Object.<string, string[]>} A map of attributes.
   * @private
   */
  private getPropsMap(varieties: OfferVariety[]) {
    return varieties.reduce<{ [key: string]: string[] }>((prev, variety: OfferVariety) => {
      const key = variety.getName();

      if (!prev[key]) {
        prev[key] = [];
      }

      prev[key].push(variety.getValue());

      return prev;
    }, {});
  }

  /**
   * Public method to get a map of sales attributes.
   *
   * @returns {Object.<string, string[]>} A map of sales attributes.
   */
  public getServiceMap() {
    return this.serviceMap;
  }

  /**
   * Public method to get a map of service attributes.
   *
   * @returns {Object.<string, string[]>} A map of service attributes.
   */
  public getVarietyMap() {
    return this.varietyMap;
  }

  /**
   * Public method to divide the offer into a CertainItem based on provided attributes.
   *
   * @param {BaseOfferProps} attributes - The attributes to divide by.
   * @returns {CertainItem} The created CertainItem instance.
   */
  public devideByAttributes(attributes: OfferVariety[]) {
    const existedCosts = this.getMatchedServices(attributes);
    const existedOffer = this.getMatchedVarieties(attributes);
    const existedMultiply = this.getMatchedSales(attributes);

    return CertainItem.create(
      {
        cost: this.props.cost,
        name: this.props.name,
        varieties: existedOffer,
        services: existedCosts,
        sale: existedMultiply,
      },
      this.getUuid()
    );
  }
}
