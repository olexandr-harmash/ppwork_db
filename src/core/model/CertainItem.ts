import BaseOfferData, { BaseOfferDataAttributes } from "./BaseOfferData";
import OfferService from "./OfferServices";
import OfferSale from "./OfferSales";

/**
 * Interface defining the attributes specific to the CertainItem class.
 * @interface
 */
export interface CertainItemAttributes extends BaseOfferDataAttributes {
  /**
   * Array of additional service costs associated with the certain item.
   */
  propCosts: OfferService[];

  /**
   * The sale associated with the certain item.
   */
  sale: OfferSale | undefined;
}

/**
 * Class representing a certain item with specific properties.
 * @class
 * @extends BaseOfferData
 */
export default class CertainItem extends BaseOfferData {
  /**
   * Properties specific to the CertainItem class.
   * @type {CertainItemAttributes}
   */
  readonly props: CertainItemAttributes;

  /**
   * Constructor for the CertainItem class.
   * @constructor
   * @param {CertainItemAttributes} props - The attributes for the CertainItem.
   * @param {string} [id] - The unique identifier of the CertainItem.
   */
  protected constructor(props: CertainItemAttributes, id?: string) {
    super(props, id);

    this.props = { ...super.getProps(), ...props };
  }

  /**
   * Override the getProps method from the base class.
   * @protected
   * @returns {CertainItemAttributes} The properties of the CertainItem.
   */
  protected getProps() {
    return this.props;
  }

  /**
   * Factory method to create an instance of the CertainItem class.
   * @static
   * @param {CertainItemAttributes} props - The attributes for the CertainItem.
   * @param {string} [id] - The unique identifier of the CertainItem.
   * @returns {CertainItem} The created CertainItem instance.
   */
  static create(props: CertainItemAttributes, id?: string) {
    return new CertainItem(props, id);
  }

  /**
   * Private method to get costs without sales.
   * @private
   * @returns {OfferService[]} Array of services without sales.
   */
  private getCostWithoutSales() {
    return this.props.propCosts.filter(
      (cost) =>
        !this.props.sale?.ifAttributeExists(
          cost.getKey(),
          cost.getValue(cost.getKey())
        )
    );
  }

  /**
   * Private method to get costs with sales.
   * @private
   * @returns {OfferService[]} Array of services with sales.
   */
  private getCostWithSales() {
    return this.props.propCosts.filter((cost) =>
      this.props.sale?.ifAttributeExists(
        cost.getKey(),
        cost.getValue(cost.getKey())
      )
    );
  }

  /**
   * Private method to summarize the cost of services.
   * @private
   * @param {OfferService[]} services - Array of services to summarize.
   * @returns {number} The total cost.
   */
  private summarizeCost(services: OfferService[]) {
    return services.reduce<number>((p, c) => (p += c.getCost()), 0);
  }

  /**
   * Public method to get the total cost of the certain item.
   * @returns {number} The total cost.
   */
  getCost() {
    const saledCost =
      (this.props.cost + this.summarizeCost(this.getCostWithSales())) *
      //@ts-ignore
      (this.props.sale?.getMultiply() || 1);
    return saledCost + this.summarizeCost(this.getCostWithoutSales());
  }
}
