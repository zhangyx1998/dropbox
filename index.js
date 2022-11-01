import express from 'express';
import * as CONFIG from './config.js';
import * as OP from './operations.js';
import { logger } from './logger.js';

const app = express();

app
	.get('*', (req, res) => {
		const
			{ url, id, hasSearch } = OP.processRequestUrl(req),
			data = OP.getDB();
		if (id in data) {
			if (!hasSearch) {
				// Return content only
				logger.info(`Read ${id} = ${data[id]}`);
				res.send(data[id]);
			} else {
				// Return detailed info
				// TODO
			}
		} else {
			logger.warn(`Attempt to read unknown key "${id}" (${req.url})`);
			res.status(404).send('404 Not Found\n');
		}
	})
	.put('*',
		express.text({ type() { return true } }),
		(req, res) => {
			const
				{ url, id: token, hasSearch } = OP.processRequestUrl(req),
				tokenList = OP.getTokens(),
				data = OP.getDB();
			let flag_write_back = false;
			for (const id in tokenList) {
				if (tokenList[id] == token) {
					data[id] = req.body.toString();
					logger.info(`Write ${id} = ${data[id]}`);
					flag_write_back = true;
				}
			}
			if (flag_write_back) OP.setDB(data);
			res.sendStatus(200);
		})
	.use((err, req, res, next) => {
		try {
			logger.error(err.message);
			res.status(500).send("Internal Server Error\n");
		} catch (e) { }
	})

app.listen(CONFIG.PORT);
logger.info(`Server up and running at port ${CONFIG.PORT}`);
