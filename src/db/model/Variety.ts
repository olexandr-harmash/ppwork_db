import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface VarietyAttributes {
  id: string;
  name: string;
  value: string;
  multiply_cost: number;
  additional_cost: number;
}

export interface VarietyInput extends Optional<VarietyAttributes, "id"> {}

export interface VarietyOutput extends Required<VarietyAttributes> {}

export default class Variety
  extends Model<VarietyOutput, VarietyInput>
  implements VarietyAttributes
{
  declare id: string;
  declare name: string;
  declare value: string;
  declare multiply_cost: number;
  declare additional_cost: number;

  static Assosiation(models: any) {
    models.Variety.belongsToMany(models.Offer, {
      through: { model: models.OfferToVariety },
      foreignKey: "variety_id",
      otherKey: "offer_id",
    });
    models.Variety.belongsToMany(models.Category, {
      through: { model: models.VarietyToCategory },
      foreignKey: "variety_id",
      otherKey: "category_id",
    });
    models.Variety.belongsToMany(models.Sale, {
      through: { model: models.SaleToVariety },
      foreignKey: "variety_id",
      otherKey: "sale_id",
    });
  }

  static Init(sequelize: Sequelize) {
    Variety.init(
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
          unique: true,
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        additional_cost: {
          type: DataTypes.REAL,
          allowNull: true,
        },
        multiply_cost: {
          type: DataTypes.REAL,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Variety",
        paranoid: true,
      }
    );
  }
}
