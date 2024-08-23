import List from '../schemas'

export const createListUseCase = async (body) => {
  try {
    return await List.create(body)
  } catch (error) {
    throw new Error(error)
  }
}
