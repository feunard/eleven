import { createContext, useContext } from "react";
import { Store } from "../services/Store";
import { Client } from "../services/Client";

export interface IServices {
  store: Store;
  client: Client;
}

export const createServices = () => {
  return {
    client: new Client(),
    store: new Store({
      page: { name: "ListAstronaut" },
      query: "",
    }),
  };
};

export const Services = createContext<IServices>(createServices());

export const useServices = () => {
  return useContext(Services);
};
