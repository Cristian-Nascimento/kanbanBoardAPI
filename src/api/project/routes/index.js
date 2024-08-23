import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../../services/passport'
import { create, index, update, destroy } from '../controllers'
import { schema } from '../schemas'

const router = new Router()
const {
  title,
  userId
} = schema.tree

/**
 * @api {post} /projects Create project
 * @apiName CreateProject
 * @apiGroup project
 * @apiParam {String} userId
 * @apiParam {String} title
 * @apiParamExample Payload example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "title": "Dashboard",
 * }
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "title": "Dashboard",
 *     "createdAt": "2024-08-10T19:53:54.800Z",
 *     "updatedAt": "2024-08-10T19:53:54.800Z",
 *     "__v": 0,
 *     "id": "66b7c552afdc807fd0f8af3d"
 * }
 * @apiSuccess {JSON} project´s data.
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true }),
  body({
    title,
    userId
  }),
  create
)

/**
 * @api {get} /projects Retrieve project
 * @apiName RetrieveProject
 * @apiGroup project
 * @apiParam {query} userId
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of project
 * @apiSuccess {Object[]} rows List of project.
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "count": 1,
 *     "rows": [
 *         {
 *             "userId": "66b798cfc738bc7d90e5de3a",
 *             "title": "Dashboard",
 *             "createdAt": "2024-08-10T19:53:54.800Z",
 *             "updatedAt": "2024-08-10T19:53:54.800Z",
 *             "__v": 0,
 *             "id": "66b7c552afdc807fd0f8af3d"
 *         }
 *   ]
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
    }
  }),
  index
)

/**
 * @api {put} /projects/:id Update project
 * @apiName UpdateProject
 * @apiGroup project
 * @apiParam {path} id Id of target item to update.
 * @apiParam {String} name project name.
 * @apiParamExample {URL} Request example:
 *  https://{localhost}/projects/66b7c386573f97a7603a121f
 * @apiParamExample {JSON} Payload example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "title": "Calculator"
 * }
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "title": "Calculator",
 *     "createdAt": "2024-08-10T19:46:14.710Z",
 *     "updatedAt": "2024-08-10T19:59:13.366Z",
 *     "__v": 0,
 *     "id": "66b7c386573f97a7603a121f"
 * }
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 404 CR não encontrada.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({
    title,
    userId
  }),
  update)

/**
 * @api {delete} /projects/:id Delete project
 * @apiName DeleteProject
 * @apiGroup project
 * @apiParam {path} id Id of target item to delete.
 * @apiParamExample {URL} Request example:
 *  https://{localhost}/projects/66b7c386573f97a7603a121f
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 CR não encontrada.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  body({
    userId
  }),
  destroy)

export default router
