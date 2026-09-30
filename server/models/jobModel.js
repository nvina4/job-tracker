import db from '../db.js'

export async function getAllJobs(userId){
    return db.prepare('SELECT * FROM jobs WHERE userId = ?').all(userId)
}

export async function getJobsByStatus(userId, status){
    return db.prepare('SELECT * FROM jobs WHERE userId = ? AND status = ?').all(userId, status)
}

export async function getJobById(userId, id){
    return db.prepare('SELECT * FROM jobs WHERE userId = ? AND id = ?').get(userId, id)
}

export async function createJob({ userId, company, title, status, applicationDate, notes }) {
const result = db
.prepare('INSERT INTO jobs (userId, company, title, status, applicationDate, notes) VALUES (?, ?, ?, ?, ?, ?)')
.run(userId, company, title, status, applicationDate, notes)
return getJobById(userId, result.lastInsertRowid)
}

export async function updateJob(userId, id, {company, title, status, applicationDate, notes}) {
    const job = await getJobById(userId, id)
    if (! job) return null
    db.prepare('UPDATE jobs SET company = ?, title = ?, status = ?, applicationDate = ?, notes = ? WHERE userId = ? AND id = ?')
    .run(company, title, status, applicationDate, notes, userId, id)
    return getJobById(userId, id)
}

export async function deleteJob(userId, id){
    const result = db.prepare('DELETE FROM jobs WHERE userId = ? AND id = ?').run(userId, id)
    return result.changes > 0
}