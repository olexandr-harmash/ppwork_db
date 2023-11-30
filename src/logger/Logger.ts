export interface LoggerInterface {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    silly: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    verbose: (...args: any[]) => void;
};