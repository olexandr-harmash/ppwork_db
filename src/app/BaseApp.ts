import path from "path";
import { LoggerInterface } from "../logger/Logger";
import { Logger } from "../logger";
import { Op, Sequelize } from "sequelize";
import { join } from "path";
import { models } from "../db/model";

export abstract class BaseApp {
  protected readonly config: any;
  protected readonly rootDir: string;
  protected readonly logger: LoggerInterface;
  protected readonly sequelize: Sequelize;
  protected readonly models: any;

  constructor(config: any) {
    this.config = config;

    this.models = models;

    this.rootDir = path.resolve(__dirname, "..", "..");

    this.logger = new Logger(config).setPrefix(`[App]:`).getLogger();

    this.config.operatorsAliases = Op;
    this.config.models = [join(__dirname, "models")];

    this.sequelize = new Sequelize(this.config[process.env.NODE_ENV || 'development']);

    Object.keys(this.models).map((k) => {
      this.models[k].Init(this.sequelize);
    });
  }
}
