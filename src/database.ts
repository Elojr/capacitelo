import { createConnection } from 'typeorm';

async function connectToDatabase() {
  await createConnection();
  console.log('Conexão com o banco de dados estabelecida.');
}

connectToDatabase();
