import { astronauts } from "./routes/astronauts";
import { Db } from "./providers/Db";
import { Server } from "./providers/Server";

const main = async () => {
  const db = new Db();
  const server = new Server({ db });
  await server.configure(astronauts);
  await server.start();
};

main().catch((e) => console.error(e));
