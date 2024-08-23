import Project from '../schemas'
import User from '../../user/model'

export const getProjectUseCase = async ({ query, select, cursor }) => {
  try {
    const user = await User.findById(query.userId)
    if (!user) throw new Error('User not found')

    const count = await Project.count(query)
    const rows = await Project.find(query, select, cursor)

    return {
      count,
      rows
    }
  } catch (error) {
    throw new Error(error)
  }
}
