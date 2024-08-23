import List from '../schemas'

export const createCardUseCase = async (body) => {
  try {
    const list = await List.findById(body.listId)
    if (!list) throw new Error('List not found')

    list.cards.push(body.cards)
    return await list.save()
  } catch (error) {
    throw new Error(error)
  }
}
