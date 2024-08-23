import { seedList } from '../../../services/seed/collections/seedList'
import Project from '../schemas'

export const createProjectUseCase = async (body) => {
  try {
    const created = await Project.create(body)
    await seedList(body.userId, created.id)

    return created
  } catch (error) {
    throw new Error(error)
  }
}
