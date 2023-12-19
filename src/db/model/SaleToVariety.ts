import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface SaleToVarietyAttributes {
  id: string;
  sale_id: string;
  variety_id: string;
}

export interface SaleToVarietyInput
  extends Optional<SaleToVarietyAttributes, "id"> {}

export interface SaleToVarietyOutput
  extends Required<SaleToVarietyAttributes> {}

export default class SaleToVariety
  extends Model<SaleToVarietyOutput, SaleToVarietyInput>
  implements SaleToVarietyAttributes
{
  declare id: string;
  declare sale_id: string;
  declare variety_id: string;

  static Assosiation(models: any) {
  }

  static Init(sequelize: Sequelize) {
    SaleToVariety.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        sale_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        variety_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "SaleToVariety",
        paranoid: true,
      }
    );
  }
}
