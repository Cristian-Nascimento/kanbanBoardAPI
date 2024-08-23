import List from '../../../api/list/schemas'
import listJson from '../seederJSON/seedList.json'

export const seedList = async (userId, projectId) => {
  const count = await List.countDocuments()

  if (count > 0) return true

  console.log('SEED[STATUS]: List')
  listJson.forEach((list) => {
    list.userId = userId
    list.projectId = projectId
  })

  return await List.insertMany(listJson)
}
