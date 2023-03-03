import { StoreData } from "../services/Store";
import { useEffect, useState } from "react";
import { useServices } from "./useServices";

/**
 * State management eco+ for the fun
 */
export const useStore = <T extends keyof StoreData>(key: T): StoreData[T] => {
  const { store } = useServices();
  const [value, setValue] = useState(store.get(key));

  useEffect(() => {
    const remove = store.sub(key, (oldValue, newValue) => {
      setValue(newValue);
    });

    return () => remove();
  }, [key]);

  return value;
};
