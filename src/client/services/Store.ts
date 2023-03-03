export type Pages =
  | {
      name: "ListAstronaut";
    }
  | {
      name: "CreateAstronaut";
    }
  | {
      name: "EditAstronaut";
      id: string;
    }
  | {
      name: "ViewAstronaut";
      id: string;
    };

export interface StoreData {
  query: string;
  page: Pages;
}

/**
 * Wish version of a state management.
 */
export class Store {
  private readonly data: StoreData;
  private readonly subscribes: Array<Sub<any>> = [];

  constructor(config: StoreData) {
    this.data = {
      ...config,
    };
  }
  public sub<T extends keyof StoreData>(
    key: T,
    cb: (oldValue: StoreData[T], newValue: StoreData[T]) => void
  ) {
    this.subscribes.push({ key, cb });
    return () => {
      const index = this.subscribes.findIndex(
        (e) => e.key === key && e.cb === cb
      );
      if (index >= 0) {
        this.subscribes.splice(index, 1);
      }
    };
  }

  public set<T extends keyof StoreData, V extends StoreData[T]>(
    key: T,
    value: V
  ): V {
    const old = this.data[key];
    this.data[key] = value;
    this.subscribes
      .filter((s) => s.key === key)
      .forEach((s) => s.cb(old, value));
    return value;
  }

  public get<T extends keyof StoreData>(key: T): StoreData[T] {
    return this.data[key];
  }
}

export interface Sub<T extends keyof StoreData> {
  key: T;
  cb: (oldValue: StoreData[T], newValue: StoreData[T]) => void;
}
