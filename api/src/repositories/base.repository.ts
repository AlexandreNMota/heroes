import {
  Model,
  ModelStatic,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
  WhereOptions,
  Attributes,
} from "sequelize";
import { RepositoryError } from "../utils/base-repository-error";

export abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    try {
      return this.model.findAll(options);
    } catch (error) {
      throw new RepositoryError("Erro ao buscar todos os registros.");
    }
  }

  async findById(id: string, options?: FindOptions): Promise<T | null> {
    try {
      return await this.model.findByPk(id, options);
    } catch (error) {
      throw new RepositoryError(`Erro ao buscar registro com ID: ${id}`);
    }
  }

  async findOne(options?: FindOptions): Promise<T | null> {
    try {
      return await this.model.findOne(options);
    } catch (error) {
      throw new RepositoryError("Erro ao buscar um registro.");
    }
  }

  async create(
    data: T["_creationAttributes"],
    options?: CreateOptions
  ): Promise<T> {
    try {
      return await this.model.create(data, options);
    } catch (error) {
      throw new RepositoryError("Erro ao criar registro.");
    }
  }

  async update(
    data: Partial<Attributes<T>>,
    options: UpdateOptions
  ): Promise<number> {
    try {
      const [affectedCount] = await this.model.update(data, options);
      return affectedCount;
    } catch (error) {
      throw new RepositoryError("Erro ao atualizar registro.");
    }
  }

  async delete(options: DestroyOptions): Promise<number> {
    try {
      return await this.model.destroy(options);
    } catch (error) {
      throw new RepositoryError("Erro ao deletar registro.");
    }
  }

  async count(options?: FindOptions): Promise<number> {
    try {
      return this.model.count(options);
    } catch (error) {
      throw new RepositoryError("Erro ao contar os registros.");
    }
  }
}
