import CertainItem from "../../core/model/CertainItem";
import { CertainItemDto } from "../dto/CertainItemDto";

export default class CertainItemMap {
  static toDTO(model: CertainItem): CertainItemDto {
    return {
      id: model.getId(),
      name: model.getName(),
      cost: model.getCost(),
      imgUrls: model.getImgUrls(),
    };
  };
};
