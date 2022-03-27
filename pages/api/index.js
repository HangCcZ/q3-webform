import Cors from 'cors'
import dbConnect from '../../../lib/dbConnect'
import initMiddleware from '../../../lib/init-middleware'

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)

export default async function handler(req, res) {
  await cors(req, res)
  await dbConnect()

  const { method } = req
  const { formBody } = req.formBody
  switch (method) {
    case 'POST':
      try {
      } catch (error) {
        res.status(400).json({ success: false })
      }
  }
}
