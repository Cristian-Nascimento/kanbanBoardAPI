import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../../services/passport'
import { createList, createCard, index, update, destroy } from '../controllers'
import { schema } from '../schemas'

const router = new Router()
const {
  title,
  cards,
  userId,
  projectId
} = schema.tree

/**
 * @api {post} /lists/card Create cards of list
 * @apiName CreateList
 * @apiGroup List
 * @apiParam {String} userId
 * @apiParam {String} listId
 * @apiParam {Array} cards
 * @apiParamExample Payload example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "listId": "66b798cfc738bc7d90e5desd",
 *     "cards": [
 *       {
 *          id: 1,
 *          content: 'Estudar módulo 01 de NodeJS',
 *          labels: ['#00ff00'],
 *          user: 'Cristian'
 *       }
 *     ]
 * @apiSuccessExample {JSON} Success response example:
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "projectId": "66b798cfc738bc7d90e5de3b",
 *     "title": "New",
 *     "hasCreate": true,
 *     "cards": [
 *       {
 *          id: 1,
 *          content: 'Estudar módulo 01 de NodeJS',
 *          labels: ['#00ff00'],
 *          user: 'Cristian'
 *       }
 *     ],
 *     "createdAt": "2024-08-10T19:53:54.800Z",
 *     "updatedAt": "2024-08-10T19:53:54.800Z",
 *     "__v": 0,
 *     "id": "66b7c552afdc807fd0f8af3d"
 * }
 * @apiSuccess {JSON} lists´s data.
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.post('/card',
  token({ required: true }),
  body({
    userId,
    cards,
    listId: {
      type: String,
      required: true
    }
  }),
  createCard
)

/**
 * @api {post} /lists Create list
 * @apiName CreateList
 * @apiGroup List
 * @apiParam {String} userId
 * @apiParam {String} projectId
 * @apiParam {String} title
 * @apiParamExample Payload example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "projectId": "66b798cfc738bc7d90e5de3b",
 *     "title": "Validação cliente",
 * @apiSuccessExample {JSON} Success response example:
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "projectId": "66b798cfc738bc7d90e5de3b",
 *     "title": "Validação cliente",
 *     "hasCreate": false,
 *     "cards": [],
 *     "createdAt": "2024-08-10T19:53:54.800Z",
 *     "updatedAt": "2024-08-10T19:53:54.800Z",
 *     "__v": 0,
 *     "id": "66b7c552afdc807fd0f8as4e"
 * }
 * @apiSuccess {JSON} lists´s data.
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true }),
  body({
    userId,
    projectId,
    title
  }),
  createList
)

/**
 * @api {get} /lists Retrieve list
 * @apiName RetrieveLists
 * @apiGroup lists
 * @apiParam {query} userId
 * @apiParam {query} projectId
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of list
 * @apiSuccess {Object[]} rows List of lists.
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "count": 4,
 *     "rows": [
 *         {
 *             "hasCreate": true,
 *             "cards": [],
 *             "title": "Novo",
 *             "userId": "66c917c2b004006f2c6da0ed",
 *             "projectId": "66c91853b004006f2c6da0f0",
 *             "__v": 0,
 *             "id": "66c91853b004006f2c6da0f3"
 *         },
 *         {
 *             "hasCreate": false,
 *             "cards": [],
 *             "title": "Em andamento",
 *             "userId": "66c917c2b004006f2c6da0ed",
 *             "projectId": "66c91853b004006f2c6da0f0",
 *             "__v": 0,
 *             "id": "66c91853b004006f2c6da0f4"
 *         },
 *         {
 *             "hasCreate": false,
 *             "cards": [],
 *             "title": "Validação (QA)",
 *             "userId": "66c917c2b004006f2c6da0ed",
 *             "projectId": "66c91853b004006f2c6da0f0",
 *             "__v": 0,
 *             "id": "66c91853b004006f2c6da0f5"
 *         },
 *         {
 *             "hasCreate": false,
 *             "cards": [],
 *             "title": "Finalizado",
 *             "userId": "66c917c2b004006f2c6da0ed",
 *             "projectId": "66c91853b004006f2c6da0f0",
 *             "__v": 0,
 *             "id": "66c91853b004006f2c6da0f6"
 *         }
 *     ]
 * }
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query({
    page: {
      max: Infinity
    },
    userId: {
      type: String,
      paths: ['userId']
    },
    projectId: {
      type: String,
      paths: ['projectId']
    }
  }),
  index
)

/**
 * @api {put} /lists/:id Update list title
 * @apiGroup lists
 * @apiParam {path} id Id of target item to update.
 * @apiParam {String} userId id user
 * @apiParam {String} projectId id project
 * @apiParam {String} title list new title.
 * @apiParamExample {URL} Request example:
 *  https://{localhost}/lists/66b7c552afdc807fd0f8as4e
 * @apiParamExample {JSON} Payload example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "projectId": "66b798cfc738bc7d90e5de3b",
 *     "title": "Fechamento cliente",
 * }
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "projectId": "66b798cfc738bc7d90e5de3b",
 *     "title": "Fechamento cliente",
 *     "hasCreate": false,
 *     "cards": [],
 *     "createdAt": "2024-08-10T19:53:54.800Z",
 *     "updatedAt": "2024-08-10T20:53:54.800Z",
 *     "__v": 0,
 *     "id": "66b7c552afdc807fd0f8as4e"
 * }
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 404 CR não encontrada.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({
    title,
    userId,
    projectId
  }),
  update)

/**
 * @api {delete} /lists/:id Delete list
 * @apiGroup lists
 * @apiParam {path} id Id of target item to delete.
 * @apiParamExample {URL} Request example:
 *  https://{localhost}/lists/66b7c552afdc807fd0f8as4e
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 CR não encontrada.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  body({
    userId,
    projectId
  }),
  destroy)

export default router
