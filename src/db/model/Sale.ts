import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import Variety from "./Variety";

export interface SaleAttributes {
  id: string;
  multiply: number;
  offer_id: string;
}

export interface SaleInput extends Optional<SaleAttributes, "id"> {}

export interface SaleOutput extends Required<SaleAttributes> {
    Varieties: Variety[]
}

export default class Sale
  extends Model<SaleInput, SaleOutput>
  implements SaleAttributes
{
  declare id: string;
  declare multiply: number;
  declare offer_id: string;

  static Assosiation(models: any) {
    models.Sale.belongsTo(models.Offer, { foreignKey: "offer_id" });
    models.Sale.belongsToMany(models.Variety, { through: { model: models.SaleToVariety }, foreignKey: 'sale_id' });
  }

  static Init(sequelize: Sequelize) {
    Sale.init(
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
        modelName: "Sale",
        paranoid: true,
      }
    );
  }
}
