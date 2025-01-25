import { Model, Optional } from "sequelize";

export interface BaseAttributes {
    id: number;
    created_at?: Date;
    updated_at?: Date;
    is_active: boolean;
}

interface BaseCreationAttributes extends Optional<BaseAttributes, "id"> {}

export class BaseEntity<
T extends BaseAttributes,
K extends BaseCreationAttributes
> extends Model<T, K> {}