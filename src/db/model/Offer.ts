import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferAttributes {
  id: string;
  name: string;
  cost: number;
}

export interface OfferInput extends Optional<OfferAttributes, "id"> {}

export interface OfferOutput extends Required<OfferAttributes> {}

export default class Offer
  extends Model<OfferOutput, OfferInput>
  implements OfferAttributes
{
  declare id: string;
  declare name: string;
  declare cost: number;

  static Assosiation(models: any) {
    models.Offer.hasMany(models.OfferSale, {
      foreignKey: "offer_id",
    });
    models.Offer.hasMany(models.OfferVariety, {
      foreignKey: "offer_id",
    });
  }

  static Init(sequelize: Sequelize) {
    Offer.init(
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
        },
        cost: {
          type: DataTypes.REAL,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Offer",
        paranoid: true,
      }
    );
  }
}
