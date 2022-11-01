import { readFileSync, writeFileSync } from 'fs';
import * as CONFIG from './config.js';
/**
 * 
 * @param {import('express').Request} req 
 * @returns 
 */
export function processRequestUrl(req) {
	const url = new URL(`http://localhost${req.url}`);
	return {
		url,
		hasSearch: !!url.search || req.url.trim().endsWith('?'),
		id: url.pathname.replace(/^\//ig, '')
	};
}

export function getDB() {
	return JSON.parse(readFileSync(CONFIG.DB_PATH));
}

export function setDB(data) {
	writeFileSync(
		CONFIG.DB_PATH,
		JSON.stringify(data, null, '\t')
	);
}

export function getTokens() {
	return JSON.parse(readFileSync(CONFIG.TOKEN_PATH));
}