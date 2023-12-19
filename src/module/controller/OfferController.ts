import { LoggerInterface } from "../../logger/Logger";
import OfferRepo from "../OfferRepo";
import CategoryRepoImpl from "../repos/Category";
import VarietyRepoImpl from "../repos/Variety";
import BaseController from "./BaseController";
import Create from "./crud/CreateOffer";
import { GetByFilters, GetCertainByFilters } from "./crud/GetByFilters";
import { GetFiltersByCategory } from "./crud/GetFiltersByCategory";

export default class OfferControllerImp extends BaseController {
  offerRepo: OfferRepo;
  varietyRepo: VarietyRepoImpl;
  categoryRepo: CategoryRepoImpl;

  constructor(
    offerRepo: OfferRepo,
    varietyRepo: VarietyRepoImpl,
    categoryRepo: CategoryRepoImpl,
    logger: LoggerInterface
  ) {
    super(logger);
    this.offerRepo = offerRepo;
    this.varietyRepo = varietyRepo;
    this.categoryRepo = categoryRepo;
  }

  Create = Create;
  GetByFilters = GetByFilters;
  GetCertainByFilters = GetCertainByFilters;
  GetFiltersByCategory = GetFiltersByCategory;
}
