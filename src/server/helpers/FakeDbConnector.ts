import { v4 } from "uuid";

export type Entity<T> = T & { id: string };

/**
 * Try to imitate something like mongodb connector.
 */
export class FakeDbConnector<T> {
  private entities: Entity<T>[] = [];

  async save(data: Partial<Entity<T>>) {
    if (data.id) {
      const index = this.entities.findIndex((it) => it.id === data.id);
      if (index > -1) {
        this.entities[index] = data as Entity<T>;
        return data as Entity<T>;
      }
    }
    const entity = {
      ...data,
      id: v4(),
    } as Entity<T>;
    this.entities.push(entity);
    return entity;
  }

  async findAll(): Promise<Entity<T>[]> {
    return this.entities;
  }
  async findById(id: string): Promise<Entity<T> | undefined> {
    return this.entities.find((it) => it.id === id);
  }

  async remove(query: { id: string }): Promise<void> {
    const index = this.entities.findIndex((it) => it.id === query.id);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }
}
