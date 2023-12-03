import { BaseApp } from "../BaseApp";
import * as BodyParser from "body-parser";
import Express from "express";
import * as Http from "http";
import * as Https from "https";
import { networkInterfaces, NetworkInterfaceInfo } from "os";
import * as fs from "fs";
import * as path from "path";
import { Logger } from "../../logger";
import loggerMiddleware from "../../router/midelware/Logger";
import OfferRepoImpl from "../../module/repos/OfferRepo";
import Offer from "../../core/model/Offer";
import OfferSale from "../../core/model/OfferSale";
import OfferVariety from "../../core/model/OfferVariety";

export default class App extends BaseApp {
  public readonly express: Express.Application;

  protected server: Http.Server | Https.Server;

  constructor(config: any) {
    super(config);

    this.express = Express();
    this.express.use(BodyParser.urlencoded({ extended: false }));
    this.express.use(BodyParser.json());
    this.express.use(
      loggerMiddleware(
        new Logger(this.config).setPrefix(`[Router]:`).getLogger()
      )
    );
  }

  async Init() {
    try {
      await this.sequelize.authenticate();

      const router = new (
        await import(`../../router/v${this.config.apiVersion}`)
      ).default();
      router.Init();
      this.express.use(`/api/v${this.config.apiVersion}`, router.getRouter());

      const repo = new OfferRepoImpl(this.models, this.sequelize);

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
