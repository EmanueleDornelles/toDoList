import { setupDatabase } from "./database";
import * as SQLite from 'expo-sqlite';

// Assuming setupDatabase initializes the 'tasks' table
setupDatabase()
  .then(() => {
    console.log('Banco de dados configurado com sucesso');
  })
  .catch(error => {
    console.error('Erro ao configurar o banco de dados:', error);
  });

// Function to insert a new task
export const createTask = async (title: string, description: string, categoryColor: string) => {
  try {
    const db = await SQLite.openDatabaseAsync('tasks.db');
    const result = await db.runAsync(
      'INSERT INTO tasks (title, description, categoryColor) VALUES (?, ?, ?)',
      [title, description, categoryColor] // Parameters should be passed as an array
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao inserir tarefa:', error);
    throw error;
  }
};

// Function to update an existing task
export const updateTask = async (id: number, title: string, description: string, categoryColor: string) => {
  try {
    const db = await SQLite.openDatabaseAsync('tasks.db');
    await db.runAsync(
      'UPDATE tasks SET title = ?, description = ?, categoryColor = ? WHERE id = ?',
      [title, description, categoryColor, id] // Parameters should be passed as an array
    );
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

// Function to delete a task
export const deleteTask = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync('tasks.db');
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]); // Parameter should be passed as an array
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    throw error;
  }
};

// Function to get all tasks
export const readTasks = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('tasks.db');
    const tasks = await db.getAllAsync('SELECT * FROM tasks');
    return tasks;
  } catch (error) {
    console.error('Erro ao obter todas as tarefas:', error);
    throw error;
  }
};

// Function to get a task by ID
export const getTaskById = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync('tasks.db');
    const task = await db.getFirstAsync('SELECT * FROM tasks WHERE id = ?', [id]); // Parameter should be passed as an array
    return task;
  } catch (error) {
    console.error('Erro ao obter tarefa pelo ID:', error);
    throw error;
  }
};
