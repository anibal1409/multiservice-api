export interface CrudRepository<T = unknown> {
  findValid(id: number | string): Promise<T>;
}
