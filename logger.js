import winston from "winston";
import { LOG_COMB_PATH, LOG_ERROR_PATH } from "./config.js";

export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		// - Write all logs with importance level of `error` or less to `error.log`
		new winston.transports.File({ filename: LOG_ERROR_PATH, level: 'error' }),
		// - Write all logs with importance level of `info` or less to `combined.log`
		new winston.transports.File({ filename: LOG_COMB_PATH }),
		new winston.transports.Console({ format: winston.format.simple() })
	],
});
