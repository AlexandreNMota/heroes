import { z } from "zod";

const SingleHeroSchema = z.object({
  name: z.string().min(1, "Name é obrigatório").max(128, "Name não pode ter mais de 128 caracteres"),
  nickname: z.string().min(1, "Nickname é obrigatório").max(128, "Nickname não pode ter mais de 128 caracteres"),
  date_of_birth: z.coerce.date().refine(date => date <= new Date(), {
    message: "Date of birth deve ser uma data válida no passado",
  }),
  universe: z.string().min(1, "Universe é obrigatório").max(128, "Universe não pode ter mais de 128 caracteres"),
  main_power: z.string().min(1, "Main Power é obrigatório").max(128, "Main Power não pode ter mais de 128 caracteres"),
  avatar_url: z.string().url("Avatar URL deve ser uma URL válida"),
  is_active: z.boolean().optional().default(true),
});

export const HeroSchema = z.union([SingleHeroSchema, z.array(SingleHeroSchema)]);

export type IHeroCreationSchema = z.infer<typeof HeroSchema>;
