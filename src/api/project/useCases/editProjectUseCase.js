import Project from '../schemas'

export const editProjectUseCase = async (body, id) => {
  try {
    const target = await Project.findById(id)

    return await Object.assign(target, body).save()
  } catch (error) {
    throw new Error(error)
  }
}
