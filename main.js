import express from 'express';
import * as CONFIG from './config.js';
import * as OP from './operations.js';

const app = express();

app
	.get('*', (req, res) => {
		const
			{ url, id, hasSearch } = OP.processRequestUrl(req),
			data = OP.getDB();
		if (id in data) {
			if (!hasSearch) {
				// Return content only
				res.send(data[id]);
			} else {
				// Return detailed info
				// TODO
			}
		} else {
			res.status(404).send('404 Not Found\n');
		}
	})
	.put('*',
		express.text({ type() { return true } }),
		(req, res) => {
			const
				{ url, id, hasSearch } = OP.processRequestUrl(req),
				tokenList = OP.getTokens(),
				data = OP.getDB();
			let flag_write_back = false;
			for (const key in tokenList) {
				if (tokenList[key] == id) {
					data[key] = req.body.toString();
					flag_write_back = true;
				}
			}
			if (flag_write_back) OP.setDB(data);
			res.sendStatus(200);
		})
	.use((err, req, res, next) => {
		try {
			console.error(err);
			res.status(500).send("Internal Server Error\n");
		} catch (e) { }
	})

app.listen(CONFIG.PORT);
console.log(`Server up and running at port ${CONFIG.PORT}`);

