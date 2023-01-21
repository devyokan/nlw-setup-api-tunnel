import Fastify from 'fastify';
import cors from '@fastify/cors';
import localtunnel from 'localtunnel';
import proxy from '@fastify/http-proxy';
import ngrok from 'ngrok';

import { appRoutes } from './routes';

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app
	.listen({
		host: '0.0.0.0',
		port: 3333,
	})
	.then(async () => {
		console.log('HTTP Server Running!');

		const tunnel = await localtunnel({
			local_host: '0.0.0.0',
			port: 3333,
			subdomain: 'habits-api',
		});
	});
