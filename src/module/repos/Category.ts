import { Op } from "sequelize";
import Category from "../../core/model/Category";
import CategoryMap from "../mapper/Category";

export default class CategoryRepoImpl {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private baseQuery() {
    return {
      where: {},
      include: [{ model: this.models.Type }, { model: this.models.Variety }],
    };
  }

  async getByPk(pk: string) {
    const model = this.models.Category;
    const query = this.baseQuery();
    query.where = {
      id: {
        [Op.eq]: pk,
      },
    };
    const category = await model.findOne(query);

    return CategoryMap.toDomain(category);
  }

  async create(category: Category) {
    const model = this.models.Category;
    const persistent = CategoryMap.toPersistent(category);
    await model.create(persistent);
  }
}
