import { seedHeroes } from "./hero.seeder";

export async function runSeeders() {
  try {
    await seedHeroes();
    console.log("Todos os seeders foram executados com sucesso!");
  } catch (error) {
    console.error("Erro ao executar os seeders:", error);
  }
}
