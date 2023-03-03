import { FakeDbConnector } from "../helpers/FakeDbConnector";
import { AstronautResource } from "../../interfaces/api.schema";

export type AstronautEntity = AstronautResource;

export class Db {
  astronauts = new FakeDbConnector<AstronautEntity>();
}
