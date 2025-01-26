export interface Hero {
    id: string;
    created_at?: Date;
    updated_at?: Date;
    is_active: boolean;
    name: string;
    nickname:string;
    date_of_birth:Date | null;
    universe:string;
    main_power:string;
    avatar_url:string;
}