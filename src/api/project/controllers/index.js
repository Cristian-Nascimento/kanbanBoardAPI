import { createProjectUseCase } from '../useCases/createProjectUseCase'
import { deleteProjectUseCase } from '../useCases/deleteProjectUseCase'
import { editProjectUseCase } from '../useCases/editProjectUseCase'
import { getProjectUseCase } from '../useCases/getProjectUseCase'

export const create = async ({ body }, response, next) => {
  try {
    const created = await createProjectUseCase(body)
    response.status(201).json(created)
  } catch (error) {
    next(error)
  }
}

export const index = async ({ querymen: query }, response, next) => {
  try {
    const indexes = await getProjectUseCase(query)
    response.status(200).json(indexes)
  } catch (error) {
    next(error)
  }
}

export const update = async ({ body, params: { id } }, response, next) => {
  try {
    const updated = await editProjectUseCase(body, id)

    response.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}

export const destroy = async ({ params: { id }, body }, response, next) => {
  try {
    await deleteProjectUseCase(id, body)
    response.status(204).json()
  } catch (error) {
    next(error)
  }
}
