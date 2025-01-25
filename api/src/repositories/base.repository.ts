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
  
  export abstract class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;
  
    constructor(model: ModelStatic<T>) {
      this.model = model;
    }
  
    async findAll(options?: FindOptions): Promise<T[]> {
      return this.model.findAll(options);
    }
  
    async findById(id: number, options?: FindOptions): Promise<T | null> {
      return this.model.findByPk(id, options);
    }
  
    async findOne(options?: FindOptions): Promise<T | null> {
      return this.model.findOne(options);
    }
  
    async create(data: T["_creationAttributes"], options?: CreateOptions): Promise<T> {
      return this.model.create(data, options);
    }
  
    async update(data: Partial<Attributes<T>>, options: UpdateOptions): Promise<number> {
      const [affectedCount] = await this.model.update(data, options);
      return affectedCount;
    }
  
    async delete(options: DestroyOptions): Promise<number> {
      return this.model.destroy(options);
    }
  }