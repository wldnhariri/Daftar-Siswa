import { createServer } from 'json-server';
import path from 'path';

const server = createServer();
const router = createServer.router(path.join(__dirname, 'db.json'));
const middlewares = createServer.defaults();

server.use(middlewares);
server.use(router);

export default server;