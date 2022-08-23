import { ZodError } from 'zod';

export interface ServiceError {
  error: ZodError;
}

export default interface IService<T> {
  create(payload: T, junctionData?: unknown): Promise<T | false>;
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: number, payload: unknown): Promise<T | null>;
  delete(id: number): Promise<T | null>;
}
