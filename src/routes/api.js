import express from 'express';

import { verifyAccessToken } from '../modules/utils/jwt.js';
import * as GeneralController from '../modules/controllers/generalController.js'
import * as ProfileController from '../modules/controllers/profileController.js'
import * as ForumController from '../modules/controllers/forumController.js'

const apiRouter = express.Router();

/* ----------- GENERAL */
apiRouter.get('/users', GeneralController.getUsers)
apiRouter.get('/user', verifyAccessToken, GeneralController.getUser)

/* ----------- PROFILE */
apiRouter.get('/profile', verifyAccessToken, ProfileController.getProfile)
apiRouter.post('/profile/upload/picture', verifyAccessToken, ProfileController.uploadUserPicture)
apiRouter.post('/profile/setOnline', verifyAccessToken, ProfileController.setOnline)

/* ----------- FORUM */
apiRouter.get('/boards', ForumController.getBoards)
apiRouter.get('/board', ForumController.getBoard)
apiRouter.post('/board/create', verifyAccessToken, ForumController.createBoard)
apiRouter.delete('/board/delete', verifyAccessToken, ForumController.deleteBoard)
apiRouter.put('/board/edit', verifyAccessToken, ForumController.editBoard)

apiRouter.get('/', (req, res) => {
    res.json({ route: 'Api router' })
})

export default apiRouter;
