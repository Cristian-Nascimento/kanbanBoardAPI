import List from '../schemas'

export const deleteListUseCase = async (_id, body) => {
  try {
    return await List.deleteOne({ _id, userId: body.userId })
  } catch (error) {
    throw new Error(error)
  }
}
