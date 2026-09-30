import 'dotenv/config'
import express from 'express'
import router from './routes.js'
import authRoutes from './auth.js'
import cors from 'cors'

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use('/auth', authRoutes)

app.use(router)

app.use((req, res) => {

    res.status(404).json({message: 'No routes found'})

})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
