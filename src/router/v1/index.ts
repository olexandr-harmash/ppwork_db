import Express from "express";

export default class Router {
  private readonly router: Express.Router;

  constructor() {
    this.router = Express.Router();
  }

  Init() {
    this.router.get("/ping", (req, res, next) => {
      return res.send("pong");
    });
  }

  getRouter() {
    return this.router;
  }
}
