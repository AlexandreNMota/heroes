// BaseService.ts
import { BaseRepository } from "../repositories/base.repository";
import {
  Model,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
  Attributes,
} from "sequelize";
import { ServiceError } from "../utils/base-service-error";

export abstract class BaseService<T extends Model> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    try {
      return await this.repository.findAll(options);
    } catch (error) {
      throw new ServiceError(`Erro ao buscar todos os registros.`);
    }
  }

  async findById(id: string, options?: FindOptions): Promise<T | null> {
    try {
      return await this.repository.findById(id, options);
    } catch (error) {
      throw new ServiceError(`Erro ao buscar registro com ID: ${id}`);
    }
  }

  async findOne(options?: FindOptions): Promise<T | null> {
    try {
      return await this.repository.findOne(options);
    } catch (error) {
      throw new ServiceError("Erro ao buscar um registro.");
    }
  }

  async create(
    data: Partial<Attributes<T>>,
    options?: CreateOptions
  ): Promise<T> {
    try {
      return await this.repository.create(data, options);
    } catch (error) {
      throw new ServiceError("Erro ao criar registro.");
    }
  }

  async update(
    data: Partial<Attributes<T>>,
    options: UpdateOptions
  ): Promise<number> {
    try {
      return await this.repository.update(data, options);
    } catch (error) {
      throw new ServiceError("Erro ao atualizar registro.");
    }
  }

  async delete(options: DestroyOptions): Promise<number> {
    try {
      return await this.repository.delete(options);
    } catch (error) {
      throw new ServiceError("Erro ao deletar registro.");
    }
  }
}
