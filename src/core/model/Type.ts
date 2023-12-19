import Entity from "../Entity";

export interface TypeAttributes {
  name: string;
}

export default class Type extends Entity<TypeAttributes> {
  protected constructor(props: TypeAttributes, id?: string) {
    super(props, id);
  }

  getName() {
    return this.props.name;
  }

  compare(variety: Type) {
    return this.getName() === variety.getName();
  }

  static create(props: TypeAttributes, id?: string) {
    return new Type(props, id);
  }
}
