import { HeroCreationAttributes } from "../entities/hero.entity";
import { Hero } from "../models";

const heroes = [
  {
    name: "Robert Bruce Banner",
    nickname: "Hulk",
    date_of_birth: "1962-04-10 00:00:00",
    universe: "Marvel",
    main_power: "Força",
    avatar_url:
      "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
  },
  {
    name: "Peter Parker",
    nickname: "Homem Aranha",
    date_of_birth: "1992-08-10 00:00:00",
    universe: "Marvel",
    main_power: "Agilidade",
    avatar_url: "https://i.imgur.com/CbdwVR2.jpeg",
  },
  {
    name: "Tony Stark",
    nickname: "Homem de Ferro",
    date_of_birth: "1970-05-29 00:00:00",
    universe: "Marvel",
    main_power: "Tecnologia",
    avatar_url: "https://i.imgur.com/J0yYSLO.jpeg",
  },
  {
    name: "Steve Rogers",
    nickname: "Capitão America",
    date_of_birth: "1921-07-04 00:00:00",
    universe: "Marvel",
    main_power: "Super força",
    avatar_url: "https://i.imgur.com/Fmj1bYx.jpeg",
  },
  {
    name: "Natasha Romanoff",
    nickname: "Viúva Negra",
    date_of_birth: "1984-11-22 00:00:00",
    universe: "Marvel",
    main_power: "Artes marciais",
    avatar_url: "https://i.imgur.com/dvwaHNC.jpeg",
  },
  {
    name: "Wanda Maximoff",
    nickname: "Feiticeira Escarlate",
    date_of_birth: "1989-02-10 00:00:00",
    universe: "Marvel",
    main_power: "Manipulação da realidade",
    avatar_url: "https://i.imgur.com/83UYGrC.jpeg",
  },
  {
    name: "Thor Odinson",
    nickname: "Thor",
    date_of_birth: "1989-02-10 00:00:00",
    universe: "Marvel",
    main_power: "Deus do trovão",
    avatar_url: "https://i.imgur.com/jF7UMbf.jpeg",
  },
  {
    name: "Bruce Wayne",
    nickname: "Batman",
    date_of_birth: "1989-02-10 00:00:00",
    universe: "DC",
    main_power: "Riqueza",
    avatar_url: "https://i.imgur.com/558s1Wc.jpeg",
  },
  {
    name: "Clark Kent",
    nickname: "Superman",
    date_of_birth: "1989-02-10 00:00:00",
    universe: "DC",
    main_power: "Super força",
    avatar_url: "https://i.imgur.com/qPm4Ufz.jpeg",
  },
  {
    name: "Diana Prince",
    nickname: "Mulher Maravilha",
    date_of_birth: "1989-02-10 00:00:00",
    universe: "DC",
    main_power: "Super força",
    avatar_url: "https://i.imgur.com/3aGbSbu.jpeg",
  },
  {
    name: "Barry Allen",
    nickname: "Flash",
    date_of_birth: "1990-03-14 00:00:00",
    universe: "DC",
    main_power: "Super velocidade",
    avatar_url: "https://i.imgur.com/lo7jsep.jpeg",
  },
] as unknown as HeroCreationAttributes[];

export async function seedHeroes() {
  try {
    for (const hero of heroes) {
      await Hero.create(hero, { validate: true });
    }

    console.log("Heroes seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}
