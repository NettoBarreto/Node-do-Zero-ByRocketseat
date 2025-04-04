import { sql } from "./db.js";

async function main() {
 // Se quiser apagar antes de criar:
  // await sql`DROP TABLE IF EXISTS videos;`
  // console.log("Tabela apagada com sucesso")

  await sql`
    CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      duration INTEGER,
      url TEXT
    );
  `

  console.log("Table created successfully");
}

main();
