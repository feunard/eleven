import { Db } from "./providers/Db";
import { Server } from "./providers/Server";

const db = new Db();
const server = new Server({ db });

server.configure();

module.exports = server.app;
