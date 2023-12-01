import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferServiceAttributes {
  id: string;
  cost: number;
  name: string;
  value: string;
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
  declare name: string;
  declare value: string;
  declare offer_id: string;

  static Assosiation(models: any) {
    models.OfferService.belongsTo(models.Offer);
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
        cost: {
          type: DataTypes.REAL,
          allowNull: false,
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
        modelName: "OfferService",
        paranoid: true,
      }
    );
  }
}
