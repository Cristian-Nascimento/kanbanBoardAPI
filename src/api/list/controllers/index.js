import { createCardUseCase } from '../useCases/createCardUseCase'
import { createListUseCase } from '../useCases/createListUseCase'
import { deleteListUseCase } from '../useCases/deleteListUseCase'
import { editListUseCase } from '../useCases/editListUseCase'
import { getListUseCase } from '../useCases/getListUseCase'

export const createList = async ({ body }, response, next) => {
  try {
    const created = await createListUseCase(body)
    response.status(201).json(created)
  } catch (error) {
    next(error)
  }
}

export const createCard = async ({ body }, response, next) => {
  try {
    const created = await createCardUseCase(body)
    response.status(201).json(created)
  } catch (error) {
    next(error)
  }
}

export const index = async ({ querymen: query }, response, next) => {
  try {
    const indexes = await getListUseCase(query)
    response.status(200).json(indexes)
  } catch (error) {
    next(error)
  }
}

export const update = async ({ body, params: { id } }, response, next) => {
  try {
    const updated = await editListUseCase(body, id)

    response.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}

export const destroy = async ({ params: { id }, body }, response, next) => {
  try {
    await deleteListUseCase(id, body)
    response.status(204).json()
  } catch (error) {
    next(error)
  }
}
