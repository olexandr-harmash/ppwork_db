import { BaseApp } from "../BaseApp";
import * as BodyParser from "body-parser";
import Express from "express";
import * as Http from "http";
import * as Https from "https";
import fileUpload from "express-fileupload";
import { networkInterfaces, NetworkInterfaceInfo } from "os";
import * as fs from "fs";
import * as path from "path";
import { Logger } from "../../logger";
import loggerMiddleware from "../../router/midelware/Logger";
import OfferControllerImp from "../../module/controller/OfferController";
import cors from "cors";
import OfferRepoImpl from "../../module/repos/Offer";
import SaleRepoImpl from "../../module/repos/Sale";
import Variety from "../../core/model/Veriety";
import Sale from "../../core/model/Sale";
import Offer from "../../core/model/Offer";
import VarietyRepoImpl from "../../module/repos/Variety";
import CategoryRepoImpl from "../../module/repos/Category";

export default class App extends BaseApp {
  public readonly express: Express.Application;

  protected server: Http.Server | Https.Server;

  constructor(config: any) {
    super(config);

    this.express = Express();
    this.express.use(cors());
    this.express.use(BodyParser.json(this.config.bodyParser));
    this.express.use(BodyParser.urlencoded(this.config.bodyParser));
    this.express.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.express.use(
      loggerMiddleware(
        new Logger(this.config).setPrefix(`[Router]:`).getLogger()
      )
    );
  }

  async Init() {
    try {
      await this.sequelize.authenticate();

      const testVariety = Variety.create({
        name: "size",
        value: "250g",
        additionalCost: 0,
        multiplyCost: 0.25,
      });

      const testSale = Sale.create({ varieties: [testVariety], multiply: 0.9 });

      const testOffer = Offer.create({
        varieties: [testVariety],
        name: "t-shirt",
        cost: 5.26,
        sales: [testSale],
        imgUrls: ["/static"],
      });

      const saleRepo = new SaleRepoImpl(this.models);
      const varietyRepo = new VarietyRepoImpl(this.models);
      const categoryRepo = new CategoryRepoImpl(this.models);
      const offerRepo = new OfferRepoImpl(this.models, saleRepo);

      // await varietyRepo.create(testVariety);
      // await offerRepo.create(testOffer);

      // const res = await offerRepo.getByFilters(
      //   { varieties: [testVariety], types: [] },
      //   { limit: 20, page: 0 }
      // );

      //console.log(res.offers[0].devideByAttributes([testVariety]).getCost())

      const controller = new OfferControllerImp(
        offerRepo,
        varietyRepo,
        categoryRepo,
        new Logger(this.config).setPrefix(`[Controller]:`).getLogger(),
      );

      const router = new (
        await import(`../../router/v${this.config.apiVersion}`)
      ).default(controller);
      router.Init();
      this.express.use(`/api/v${this.config.apiVersion}`, router.getRouter());

      this.server = await this.serverInitializer();
      this.serverListener();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private serverInitializer = ServerInitializer;
  private serverListener = ServerListener;
}

async function ServerInitializer(
  this: App
): Promise<Http.Server | Https.Server> {
  if (this.config.protocol !== "https") {
    return Http.createServer(this.express);
  }

  // Set ssl certificate
  const sslDir: string = path.resolve(this.rootDir, "config", "ssl");
  const credentials = {
    key: fs.readFileSync(path.join(sslDir, "server.key"), "utf8"),
    cert: fs.readFileSync(path.join(sslDir, "server.cer"), "utf8"),
  };

  // Create server instance
  return Https.createServer(credentials, this.express);
}

function ServerListener(this: App): void {
  this.server.listen(this.config.port, (): void => {
    // Show info about running server
    const addresses: string[] = [`localhost`];
    const ifaces = networkInterfaces();
    Object.keys(ifaces).forEach((ifname: string): void => {
      ifaces[ifname]?.forEach((iface: NetworkInterfaceInfo): void => {
        // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        if (iface.family !== "IPv4" || iface.internal !== false) {
          return;
        }
        addresses.push(iface.address);
      });
    });
    this.logger.info(
      `Listening in ${
        process.env.NODE_ENV || "development"
      } mode at:\n${addresses
        .map(
          (address: string): string =>
            `${this.config.protocol}://${address}:${this.config.port}`
        )
        .join("\n")}`
    );
  });
}
