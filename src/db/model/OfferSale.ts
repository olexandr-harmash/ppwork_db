import {
  BelongsToManyAddAssociationMixin,
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import OfferVariety from "./OfferVariety";

export interface OfferSaleAttributes {
  id: string;
  multiply: number;
  offer_id: string;
}

export interface OfferSaleInput extends Optional<OfferSaleAttributes, "id"> {}

export interface OfferSaleOutput extends Required<OfferSaleAttributes> {}

export default class OfferSale
  extends Model<OfferSaleOutput, OfferSaleInput>
  implements OfferSaleAttributes
{
  declare id: string;
  declare multiply: number;
  declare offer_id: string;

  declare setOfferVarieties: BelongsToManyAddAssociationMixin<OfferVariety, string>;

  static Assosiation(models: any) {
    models.OfferSale.belongsTo(models.Offer, { foreignKey: "offer_id" });
    models.OfferSale.belongsToMany(models.OfferVariety, {
      through: "VarietySale"
    });
  }

  static Init(sequelize: Sequelize) {
    OfferSale.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        multiply: {
          type: DataTypes.REAL,
          allowNull: false,
        },
        offer_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "OfferSale",
        paranoid: true,
      }
    );
  }
}
