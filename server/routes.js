import express from 'express'
import * as Job from './models/jobModel.js'
import { requireAuth } from './middleware.js'
import { validateBody, jobSchema } from './validate.js'

const router = express.Router()

router.get('/jobs', requireAuth, async (req, res) => {
    const userId = req.user.id
    const status = req.query.status
    if (status) {
        const filtered = await Job.getJobsByStatus(userId, status)
        return res.json(filtered)
    }
    const jobs = await Job.getAllJobs(userId)
    res.json(jobs)
})

router.get('/jobs/:id', requireAuth, async (req, res) => {
    const userId = req.user.id
    const job = await Job.getJobById(userId, Number(req.params.id))

    if(!job) {
        return res.status(404).json({message: 'No jobs found'})
    }

    res.json(job)
})

router.post('/jobs', requireAuth, validateBody(jobSchema), async (req, res) => {
    const userId = req.user.id
    const newJob = await Job.createJob({...req.body, userId})
    res.status(201).json(newJob)
})

router.put('/jobs/:id', requireAuth, validateBody(jobSchema),  async (req, res) => {
    const userId = req.user.id
    const job = await Job.updateJob(userId, Number(req.params.id),req.body)

    if (!job) {
       return res.status(404).json({message: 'Job not found'})
    }

    res.json(job)
})

router.delete('/jobs/:id', requireAuth, async (req, res) => {
    const userId = req.user.id
    const deleted = await Job.deleteJob(userId, Number(req.params.id))

    if(!deleted){

        return res.status(404).json({error: 'Job not found'})
    }
    res.status(200).json({message: 'Job deleted'})
})


export default router

