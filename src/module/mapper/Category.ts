import Category from "../../core/model/Category";
import { CategoryAttributes, CategoryOutput } from "../../db/model/Category";
import TypeMap from "./Type";
import VarietyMap from "./Variety";

export default class CategoryMap {
  static toDTO(model: Category): any {
    return {
      types: model
        .getTypes()
        .map((t) => ({ id: t.getId(), name: t.getName() })),
      ...model.getVarieties().reduce((acc, v) => {
        const name = v.getName();
        if (!acc[name]) {
          acc[name] = [];
        }
        acc[name].push({ id: v.getId(), value: v.getValue() });
        return acc;
      }, {}),
    };
  }

  static toDomain(model: CategoryOutput): Category {
    return Category.create(
      {
        name: model.name,
        imgDir: model.img_dir,
        types: model.Types.map((t) => TypeMap.toDomain(t)),
        varieties: model.Varieties.map((v) => VarietyMap.toDomain(v)),
      },
      model.id
    );
  }
  static toPersistent(model: Category): CategoryAttributes {
    return {
      id: model.getId(),
      name: model.getName(),
      img_dir: model.getImgDir(),
    };
  }
}
