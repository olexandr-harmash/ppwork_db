import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferToVarietyAttributes {
  id: string;
  offer_id: string;
  variety_id: string;
}

export interface OfferToVarietyInput
  extends Optional<OfferToVarietyAttributes, "id"> {}

export interface OfferToVarietyOutput
  extends Required<OfferToVarietyAttributes> {}

export default class OfferToVariety
  extends Model<OfferToVarietyOutput, OfferToVarietyInput>
  implements OfferToVarietyAttributes
{
  declare id: string;
  declare offer_id: string;
  declare variety_id: string;

  static Assosiation(models: any) {
  }

  static Init(sequelize: Sequelize) {
    OfferToVariety.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        offer_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Offer",
            key: "id",
          },
        },
        variety_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Variety",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "OfferToVariety",
        paranoid: true,
      }
    );
  }
}
