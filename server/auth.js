import express from 'express'
import bcrypt from 'bcrypt'
import db from './db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    const {email, password} = req.body
    const existing = db.prepare(`SELECT id FROM users WHERE email = ?`).get(email)

    if(existing) {
        return res.status(409).json({message: 'email already in use'})
    }

    const hashed = await bcrypt.hash(password, 10)
    const result =  db.prepare(`INSERT INTO users(email, password) VALUES (?, ?)`).run(email, hashed)

    res.status(201).json({id: result.lastInsertRowid, email, message: 'Account created!'})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email)

    if(!user) {
        return res.status(401).json({message: 'Incorrect email or password'})
    }

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
        return res.status(401).json({message: 'Invalid credentials'})
    }

    const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.json({token})
})

export default router