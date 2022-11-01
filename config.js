import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
// Load optional config file
const CONFIG_FILE = './config.json'
const config = existsSync(CONFIG_FILE)
	? JSON.parse(readFileSync(CONFIG_FILE))
	: {}
// Port to listen
export const PORT = parseInt(config.port ?? 8888);
// Project root
export const ROOT = dirname(fileURLToPath(import.meta.url))
// Create required directories and files if not exist
export const VAR_PATH = config.var_path ?? resolve(ROOT, 'var');
if (!existsSync(VAR_PATH)) mkdirSync(VAR_PATH);
export const DB_PATH = config.db_path ?? resolve(VAR_PATH, 'dropbox.json');
if (!existsSync(DB_PATH)) writeFileSync(DB_PATH, JSON.stringify({}));
export const TOKEN_PATH = config.token_path ?? resolve(VAR_PATH, 'token.json');
if (!existsSync(TOKEN_PATH)) writeFileSync(TOKEN_PATH, JSON.stringify({}));
