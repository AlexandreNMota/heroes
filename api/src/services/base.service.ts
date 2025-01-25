// BaseService.ts
import { BaseRepository } from '../repositories/base.repository';
import { Model, FindOptions, CreateOptions, UpdateOptions, DestroyOptions, Attributes } from 'sequelize';

export abstract class BaseService<T extends Model> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    return this.repository.findAll(options);
  }

  async findById(id: string, options?: FindOptions): Promise<T | null> {
    return this.repository.findById(id, options);
  }

  async findOne(options?: FindOptions): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async create(data: Partial<Attributes<T>>, options?: CreateOptions): Promise<T> {
    return this.repository.create(data, options);
  }

  async update(data: Partial<Attributes<T>>, options: UpdateOptions): Promise<number> {
    return this.repository.update(data, options);
  }

  async delete(options: DestroyOptions): Promise<number> {
    return this.repository.delete(options);
  }
}