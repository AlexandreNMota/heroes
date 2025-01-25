import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import { BaseEntity } from "../../entities/base.entity";
import { HeroAttributes, HeroCreationAttributes } from "../../entities/hero.entity";
import { v4 as uuidv4 } from "uuid";

export class Hero extends BaseEntity<HeroAttributes, HeroCreationAttributes> implements Model<HeroAttributes, HeroCreationAttributes> {
    public id?: string;
    public name!: string;
    public nickname!: string;
    public date_of_birth!: Date;
    public universe!: string;
    public main_power!: string;
    public avatar_url!: string;
    public created_at?: Date;
    public updated_at?: Date;
    public is_active!: boolean;
}

Hero.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        universe: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        main_power: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        avatar_url: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        sequelize,
        tableName: "tb_heroes",
        timestamps: true,
        underscored: true,
    }
);
