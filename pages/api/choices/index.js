import Cors from 'cors'
import dbConnect from '../../../lib/dbConnect'
import initMiddleware from '../../../lib/init-middleware'
import Choices from '../../../models/Choices'

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
  switch (method) {
    case 'POST':
      // check if choiceA or choiceB or choiceC exist in request body
      if (!req.body.choiceA || !req.body.choiceB || !req.body.choiceC) {
        res.status(400).json({ success: false })
      }

      const allChoices = [req.body.choiceA, req.body.choiceB, req.body.choiceC]

      let calculusExist = false
      for (let i = 0; i < allChoices.length; i++) {
        if (allChoices[i].toLowerCase() === 'calculus') {
          calculusExist = true
          break
        }
      }

      if (calculusExist) {
        try {
          const newChoices = await Choices.create(req, req.body)
          res.status(201).json({
            success: true,
            message: 'Just Webform successfully submitted',
          })
        } catch (error) {
          res.status(400).json({ success: false, message: error })
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'List of choices did not contains calculus',
        })
      }
  }
}
