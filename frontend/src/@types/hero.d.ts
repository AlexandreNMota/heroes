export interface Hero {
    id: string;
    created_at?: Date;
    createdAt?: Date;
    updated_at?: Date;
    updatedAt?: Date;
    is_active: boolean;
    name: string;
    nickname:string;
    date_of_birth:Date | string | null;
    universe:string;
    main_power:string;
    avatar_url:string;
}