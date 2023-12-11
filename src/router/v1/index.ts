import Express from "express";
import OfferControllerImp from "../../module/controller/OfferController";
import { GetByFiltersPolicy } from "../../module/controller/policies/GetByFilters";
import { CreateOffer } from "../../module/controller/policies/CreateOffer";

export default class Router {
  private readonly router: Express.Router;
  private readonly controller: OfferControllerImp;

  constructor(controller: OfferControllerImp) {
    this.router = Express.Router();
    this.controller = controller;
  }

  Init() {
    this.router.get("/ping", (req, res, next) => {
      return res.send("pong");
    });

    this.router.get(
      "/item",
      GetByFiltersPolicy(),
      this.controller.GetCertainByFilters()
    );

    this.router.get(
      "/offer",
      GetByFiltersPolicy(),
      this.controller.GetByFilters()
    );

    this.router.post("/offer", CreateOffer(), this.controller.Create());
  }

  getRouter() {
    return this.router;
  }
}
