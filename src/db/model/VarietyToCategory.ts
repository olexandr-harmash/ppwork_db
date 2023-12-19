import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface VarietyToCategoryAttributes {
  id: string;
  category_id: string;
  variety_id: string;
}

export interface VarietyToCategoryInput
  extends Optional<VarietyToCategoryAttributes, "id"> {}

export interface VarietyToCategoryOutput
  extends Required<VarietyToCategoryAttributes> {}

export default class VarietyToCategory
  extends Model<VarietyToCategoryOutput, VarietyToCategoryInput>
  implements VarietyToCategoryAttributes
{
  declare id: string;
  declare category_id: string;
  declare variety_id: string;

  static Assosiation(models: any) {
  }

  static Init(sequelize: Sequelize) {
    VarietyToCategory.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Category",
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
        modelName: "VarietyToCategory",
        paranoid: true,
      }
    );
  }
}
