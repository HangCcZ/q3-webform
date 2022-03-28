import mongoose from 'mongoose'

const ChoicesSchema = new mongoose.Schema(
  {
    choiceA: String,
    choiceB: String,
    choiceC: String,
  },
  { timestamps: true }
)

export default mongoose.models.Choices ||
  mongoose.model('Choices', ChoicesSchema)
