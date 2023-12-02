import Express from "express";
import { LoggerInterface } from "../../logger/Logger";

export default function Logger(logger: LoggerInterface) {
  return (req: Express.Request, res: Express.Response, next: any) => {
    logger.info(req.baseUrl, req.url, req.method);
    next();
  };
}
