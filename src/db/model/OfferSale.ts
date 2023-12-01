import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferSaleAttributes {
  id: string;
  name: string;
  value: string;
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
  declare name: string;
  declare value: string;
  declare multiply: number;
  declare offer_id: string;

  static Assosiation(models: any) {
    models.OfferSale.belongsTo(models.Offer);
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        value: {
          type: DataTypes.STRING,
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
          primaryKey: true,
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
