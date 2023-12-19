import Sale from "./Sale";
import Variety from "./Veriety";
import BaseGoodData, { BaseGoodDataAttributes } from "./BaseGoodData";
import nCertainItem from "./CertainItem";

export interface OfferAttributes extends BaseGoodDataAttributes {
  sales: Sale[];
}

/**
 * Class representing an offer.
 *
 * @extends BaseGoodData
 */
export default class Offer extends BaseGoodData {
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
   * Private method to get multipliers that match provided attributes.
   *
   * @param {BaseOfferProps} attributes - The attributes to match.
   * @returns {Sale | undefined} The multiplier that matches the provided attributes, if any.
   * @private
   */
  private getMatchedSales(attributes: Variety[]) {
    return this.props.sales.find((sale) => sale.isAllSalesMatched(attributes));
  }

  /**
   * Private method to create a map of attributes for sales or services.
   *
   * @param {BaseOfferProps[]} withAttr - Array of BaseOfferProps to create a map from.
   * @returns {Object.<string, string[]>} A map of attributes.
   * @private
   */
  private getPropsMap(varieties: Variety[]) {
    return varieties.reduce<{ [key: string]: string[] }>(
      (prev, variety: Variety) => {
        const key = variety.getName();

        if (!prev[key]) {
          prev[key] = [];
        }

        prev[key].push(variety.getValue());

        return prev;
      },
      {}
    );
  }

  /**
   * Public method to get a map of sales attributes.
   *
   * @returns {Object.<string, string[]>} A map of sales attributes.
   */
  public getServiceMap() {
    return this.serviceMap;
  }

  public getVarieties() {
    return this.props.varieties;
  }

  public getSales() {
    return this.props.sales;
  }

  /**
   * Public method to get a map of service attributes.
   *
   * @returns {Object.<string, string[]>} A map of service attributes.
   */
  public getVarietyMap() {
    return this.varietyMap;
  }

  public addSale(sale: Sale) {
    this.props.sales.push(sale);
  }

  /**
   * Public method to divide the offer into a CertainItem based on provided attributes.
   *
   * @param {BaseOfferProps} attributes - The attributes to divide by.
   * @returns {CertainItem} The created CertainItem instance.
   */
  public devideByAttributes(attributes: Variety[]) {
    const existedMultiply = this.getMatchedSales(attributes);
    const existedVarieties = this.getMatchedVarieties(attributes);

    return nCertainItem.create(
      {
        imgUrls: this.getImgUrls(),
        cost: this.props.cost,
        name: this.props.name,
        sale: existedMultiply,
        varieties: existedVarieties,
      },
      this.getUuid()
    );
  }
}
