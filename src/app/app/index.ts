import { BaseApp } from "../BaseApp";
import * as BodyParser from 'body-parser';
import Cors from 'cors';
import Express from "express";
import * as Http from "http";
import * as Https from "https";
import { networkInterfaces, NetworkInterfaceInfo } from "os";
import * as fs from "fs";
import * as path from "path";

export default class App extends BaseApp {
  public readonly express: Express.Application;

  protected server: Http.Server | Https.Server;

  constructor(config: any) {
    super(config);

    // Init express
    this.express = Express();
    this.express.use(Cors);
    this.express.use(BodyParser.json(this.config.bodyParser));
    this.express.use(BodyParser.urlencoded(this.config.bodyParser));
  }

  async init() {
    try {
      await this.sequelize.authenticate();

      this.server = await this.ServerInitializer();
      this.ServerListener();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private ServerInitializer = ServerInitializer;
  private ServerListener = ServerListener;
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
