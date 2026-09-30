import { z } from 'zod'

export const jobSchema = z.object({
  company: z.string().min(1, 'company is required'),
  title: z.string().min(1, 'title is required'),
  status: z.string().min(1, 'status is required'),
  applicationDate: z.string().optional(),
  notes: z.string().optional()
})

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.issues.map(issue => issue.message)
      return res.status(400).json({ errors })
    }
    req.body = result.data
    next()
  }
}

