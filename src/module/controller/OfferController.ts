import { LoggerInterface } from "../../logger/Logger";
import OfferRepo from "../OfferRepo";
import BaseController from "./BaseController";
import Create from "./crud/CreateOffer";
import {GetByFilters, GetCertainByFilters} from "./crud/GetByFilters";

export default class OfferControllerImp extends BaseController {
  repo: OfferRepo;

  constructor(repo: OfferRepo, logger: LoggerInterface) {
    super(logger);
    this.repo = repo;
  }

  Create = Create;
  GetByFilters = GetByFilters;
  GetCertainByFilters = GetCertainByFilters;
}
