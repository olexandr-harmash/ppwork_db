import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferServiceAttributes {
  id: string;
  cost: number;
  offer_variety_id: string;
  offer_id: string;
}

export interface OfferServiceInput
  extends Optional<OfferServiceAttributes, "id"> {}

export interface OfferServiceOutput extends Required<OfferServiceAttributes> {}

export default class OfferService
  extends Model<OfferServiceOutput, OfferServiceInput>
  implements OfferServiceAttributes
{
  declare id: string;
  declare cost: number;
  declare offer_variety_id: string;
  declare offer_id: string;

  static Assosiation(models: any) {
    models.OfferService.belongsTo(models.OfferVariety, {
      foreignKey: "offer_variety_id",
    });
    models.OfferService.belongsTo(models.Offer, { foreignKey: "offer_id" });
  }

  static Init(sequelize: Sequelize) {
    OfferService.init(
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
        },
        cost: {
          type: DataTypes.REAL,
          allowNull: false,
        },
        offer_variety_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "OfferService",
        paranoid: true,
      }
    );
  }
}
