import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import Type from "./Type";
import Variety from "./Variety";

export interface CategoryAttributes {
  id: string;
  name: string;
  img_dir: string;
}

export interface CategoryInput extends Optional<CategoryAttributes, "id"> {}

export interface CategoryOutput extends Required<CategoryAttributes> {
  Types: Type[];
  Varieties: Variety[];
}

export default class Category
  extends Model<CategoryInput, CategoryOutput>
  implements CategoryAttributes
{
  declare id: string;
  declare name: string;
  declare img_dir: string;

  static Assosiation(models: any) {
    models.Category.hasMany(models.Type, {foreignKey: "category_id"})
    models.Category.belongsToMany(models.Variety, {
      through: { model: models.VarietyToCategory },
      foreignKey: "category_id",
      otherKey: "variety_id",
    });
  }

  static Init(sequelize: Sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        img_dir: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Category",
        paranoid: true,
      }
    );
  }
}
