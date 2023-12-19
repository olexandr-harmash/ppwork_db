import BaseGoodData, { BaseGoodDataAttributes } from "./BaseGoodData";
import Sale from "./Sale";

/**
 * Interface defining the attributes specific to the CertainItem class.
 * @interface
 */
export interface CertainItemAttributes extends BaseGoodDataAttributes {
  /**
   * The sale associated with the certain item.
   */
  sale: Sale | undefined;
}

/**
 * Class representing a certain item with specific properties.
 * @class
 * @extends BaseOfferData
 */
export default class CertainItem extends BaseGoodData {
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
   * Private method to summarize the cost of services.
   * @private
   * @param {OfferService[]} services - Array of services to summarize.
   * @returns {number} The total cost.
   */
  private summarizeCost() {
    return this.props.varieties.reduce<number>(
      (p, c) => (p += c.getAdditionalCost()),
      0
    );
  }

  /**
   * Private method to summarize the cost of services.
   * @private
   * @param {OfferService[]} services - Array of services to summarize.
   * @returns {number} The total cost.
   */
  private multiplyCost(cost) {
    return this.props.varieties.reduce<number>(
      (p, c) => (p *= c.getMultiplyCost()),
      cost
    );
  }

  /**
   * Public method to get the total cost of the certain item.
   * @returns {number} The total cost.
   */
  getCost() {
    const saledCost = this.props.cost * (this.props.sale?.getMultiply() || 1);
    return parseFloat(
      (this.multiplyCost(saledCost) + this.summarizeCost()).toFixed(2)
    );
  }
}
