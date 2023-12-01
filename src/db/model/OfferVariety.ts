import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferVarietyAttributes {
  id: string;
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
  declare name: string;
  declare value: string;
  declare offer_id: string;

  static Assosiation(models: any) {
    models.OfferVariety.belongsTo(models.Offer);
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
        offer_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: "OfferVariety",
        paranoid: true,
      }
    );
  }
}
