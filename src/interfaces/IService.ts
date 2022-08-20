import { ZodError } from 'zod';

export interface ServiceError {
  error: ZodError;
}

export default interface IService<T> {
  create(payload: T): Promise<T | ServiceError>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, payload: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
