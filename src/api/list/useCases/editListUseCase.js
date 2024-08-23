import List from '../schemas'

export const editListUseCase = async (body, id) => {
  try {
    const target = await List.findById(id)

    return await Object.assign(target, body).save()
  } catch (error) {
    throw new Error(error)
  }
}
