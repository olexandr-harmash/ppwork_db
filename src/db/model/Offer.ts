import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface OfferAttributes {
  id: string;
  name: string;
  cost: number;
  img_urls: string[];
}

export interface OfferInput extends Optional<OfferAttributes, "id"> {}

export interface OfferOutput extends Required<OfferAttributes> {}

export default class Offer
  extends Model<OfferOutput, OfferInput>
  implements OfferAttributes
{
  declare id: string;
  declare name: string;
  declare cost: number;
  declare img_urls: string[];

  static Assosiation(models: any) {
    models.Offer.hasMany(models.Sale, {
        foreignKey: "offer_id",
    });
    models.Offer.belongsToMany(models.Variety, { through: { model: models.OfferToVariety }, foreignKey: 'offer_id',  otherKey: 'variety_id', });
  }

  static Init(sequelize: Sequelize) {
    Offer.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        img_urls: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cost: {
          type: DataTypes.REAL,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Offer",
        paranoid: true,
      }
    );
  }
}
