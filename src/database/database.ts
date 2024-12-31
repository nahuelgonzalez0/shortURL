import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
let db : Database | null
// Abre la base de datos SQLite (se crea si no existe)
export async function connect(): Promise<Database | null> {
  if (!db) {
    try {
      db = await open({
        filename: 'ts-app.db',
        driver: sqlite3.Database
      })
      console.log("db conectada")
    } catch (error) {
      console.error('Error connecting to the database', error)
    }
  }
  return db
}

export default connect