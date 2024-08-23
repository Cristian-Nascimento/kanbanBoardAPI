import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
  title: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_obj, ret) => { delete ret._id }
  }
})

projectSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      title: this.title,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? { ...view } : view
  }
}

const model = mongoose.model('Project', projectSchema)

export const schema = model.schema
export default model
