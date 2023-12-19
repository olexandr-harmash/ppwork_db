import Entity from "../Entity";
import Type from "./Type";
import Variety from "./Veriety";

export interface CategoryAttributes {
  varieties: Variety[];
  types: Type[];
  name: string;
  imgDir: string;
}

export default class Category extends Entity<CategoryAttributes> {
  protected constructor(props: CategoryAttributes, id?: string) {
    super(props, id);
  }

  getTypes() {
    return this.props.types;
  }

  getVarieties() {
    return this.props.varieties;
  }

  getName() {
    return this.props.name;
  }

  getImgDir() {
    return this.props.imgDir;
  }

  compare(variety: Category) {
    return this.getName() === variety.getName();
  }

  static create(props: CategoryAttributes, id?: string) {
    return new Category(props, id);
  }
}
