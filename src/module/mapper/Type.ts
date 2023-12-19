import Type from "../../core/model/Type";
import { TypeOutput } from "../../db/model/Type";

export default class TypeMap {
  static toDTO(model: Type) {
    throw new Error("Method not implemented.");
  }
  static toDomain(model: TypeOutput): Type {
    return Type.create(
      {
          name: model.name
      },
      model.id
    );
  }
  static toPersistent(model: Type): any {
    return {
      id: model.getId(),
      name: model.getName(),
    };
  }
}
