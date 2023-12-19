import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface TypeAttributes {
  id: string;
  name: string;
  category_id: string;
}

export interface TypeInput extends Optional<TypeAttributes, "id"> {}

export interface TypeOutput extends Required<TypeAttributes> {}

export default class Type
  extends Model<TypeOutput, TypeInput>
  implements TypeAttributes
{
  declare id: string;
  declare name: string;
  declare category_id: string;

  static Assosiation(models: any) {
    models.Type.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  }

  static Init(sequelize: Sequelize) {
    Type.init(
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
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Type",
        paranoid: true,
      }
    );
  }
}
