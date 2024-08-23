import List from '../schemas'

export const getListUseCase = async ({ query, select, cursor }) => {
  try {
    const count = await List.count(query)
    const rows = await List.find(query, select, cursor)

    return {
      count,
      rows
    }
  } catch (error) {
    throw new Error(error)
  }
}
