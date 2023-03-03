import { ElevenApi } from "../../interfaces/api.schema";
import fastify from "fastify";
import { config } from "../config";
import path from "path";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import { Db } from "./Db";

export interface Services {
  db: Db;
}

export class Server {
  private schema: any;

  constructor(
    public services: Services,
    public app = fastify({
      logger: true,
    })
  ) {}

  public async configure(...routes: Array<(s: Server) => any>) {
    // import client schema
    this.schema = await $RefParser.dereference(
      require("../../../schemas/api.schema.json")
    );

    // -- plugins

    // + swagger for documentations
    await this.app.register(require("@fastify/swagger"), {
      swagger: {
        info: {
          title: "Test swagger",
          description: "Testing the Fastify swagger API",
          version: "0.1.0",
        },
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
      },
    });

    // + swagger-ui for documentations
    await this.app.register(require("@fastify/swagger-ui"), {});

    // + http static server for host react app
    await this.app.register(require("@fastify/static"), {
      root: path.join(__dirname, "../../..", "dist"),
    });

    routes.forEach((route) => route(this));
  }

  /**
   * Start http server.
   */
  public async start() {
    await this.app.listen({
      host: config.HTTP_HOST,
      port: Number(config.HTTP_PORT),
    });
  }

  /**
   * Listen an incoming request.
   *
   * @param action
   * @param callback
   */
  public on<T extends keyof ElevenApi>(
    action: T,
    callback: (
      body: ElevenApi[T]["request"],
      services: Services
    ) => Promise<ElevenApi[T]["response"]>
  ) {
    // for lazy reason, it uses only post
    // in order to be more "restful" it should be better to map with real http method
    this.app.post(
      `/api/${action}`,
      {
        schema: {
          description: action,
          summary: action,
          // bind schema for documentation & json schema validations
          response: {
            200: {
              description: action,
              ...this.schema.properties[action].properties.response,
            },
          },
        },
      },
      (req) => callback(req.body as ElevenApi[T]["request"], this.services)
    );
  }
}
