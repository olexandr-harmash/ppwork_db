import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferVarietyAttributes {
  id: string;
  cost: number;
  name: string;
  value: string;
  offer_id: string;
}

export interface OfferVarietyInput
  extends Optional<OfferVarietyAttributes, "id"> {}

export interface OfferVarietyOutput extends Required<OfferVarietyAttributes> {}

export default class OfferVariety
  extends Model<OfferVarietyOutput, OfferVarietyInput>
  implements OfferVarietyAttributes
{
  declare id: string;
  declare cost: number;
  declare name: string;
  declare value: string;
  declare offer_id: string;

  static Assosiation(models: any) {
    models.OfferVariety.belongsTo(models.Offer);
    models.OfferVariety.belongsToMany(models.OfferSale, {
      through: "VarietySale",
    });
  }

  static Init(sequelize: Sequelize) {
    OfferVariety.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        cost: {
          type: DataTypes.REAL,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        offer_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "OfferVariety",
        paranoid: true,
      },
    );
  }
}
