import Project from '../schemas'

export const deleteProjectUseCase = async (_id, body) => {
  try {
    return await Project.deleteOne({ _id, userId: body.userId })
  } catch (error) {
    throw new Error(error)
  }
}
