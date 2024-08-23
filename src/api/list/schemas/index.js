import mongoose, { Schema } from 'mongoose'

const listSchema = new Schema({
  title: {
    type: String
  },
  hasCreate: {
    type: Boolean,
    default: false
  },
  cards: {
    type: Array,
    default: []
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_obj, ret) => { delete ret._id }
  }
})

listSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      title: this.title,
      hasCreate: this.hasCreate,
      cards: this.cards,
      userId: this.userId,
      projectId: this.projectId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? { ...view } : view
  }
}

const model = mongoose.model('List', listSchema)

export const schema = model.schema
export default model
