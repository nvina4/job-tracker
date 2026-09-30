import Database from 'better-sqlite3'

const db = new Database('./jobs.db')

db.exec(`
    
    CREATE TABLE IF NOT EXISTS jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        status TEXT NOT NULL,
        applicationDate TEXT,
        notes TEXT
    )
`)


db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`)


export default db