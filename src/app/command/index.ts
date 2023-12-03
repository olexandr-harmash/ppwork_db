import { BaseApp } from "../BaseApp";

export default class Command extends BaseApp {
  public readonly _args: string[] | null;

  public constructor(config: any) {
    super(config);

    this._args = process.argv.length > 3 ? process.argv.slice(3) : null;
  }

  public async Init(): Promise<void> {
    // Run command
    this.RunCommand(process.argv[2]);
  }

  private async RunCommand(command: string): Promise<void> {
    try {
      switch (command) {
        case "db:create":
          await this.sequelize.sync({ force: false });
          break;
        default:
          throw new Error(`Invalid command ${command}`);
      }
    } catch (err) {
      this.logger.error(`Command ${process.argv[2]} returned error`, err);
    }
  }
}
