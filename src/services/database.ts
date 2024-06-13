import * as SQLite from 'expo-sqlite';

// Função para configurar o banco de dados e criar a tabela de tarefas, se não existir
export const setupDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('tasks.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      categoryColor TEXT
    );
  `);
};
