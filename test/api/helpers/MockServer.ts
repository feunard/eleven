import { Db } from "../../../src/server/providers/Db";
import { Server, Services } from "../../../src/server/providers/Server";

export class MockServer extends Server {
  constructor() {
    super({
      db: new Db(),
    });
  }

  registry: Array<{
    key: string;
    callback: (data: any, s: Services) => any;
  }> = [];

  emit(key: string, data: any): Promise<any> {
    return this.registry
      .find((it) => it.key === key)
      ?.callback(data, this.services);
  }

  on(key: string, callback: (data: any, s: Services) => any) {
    this.registry.push({ key, callback });
  }

  with(...routes: Array<(s: MockServer) => any>) {
    routes.forEach((route) => route(this));
    return this;
  }
}
