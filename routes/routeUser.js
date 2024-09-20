import express from 'express'
import { deleteUserById, deleteUsers, getAllUsers, getUserById, loginUser, registerUser, updateUserByAdmin, updateUserByClient } from '../controllers/controllerUser.js'
import { validarToken } from '../utils/token.js'
import { authorizateAdmin } from '../utils/validateAdmin.js'

const router = express.Router()

router.get("/", validarToken, authorizateAdmin, getAllUsers)
router.get("/user/:id",validarToken, getUserById)
router.post('/', registerUser)
router.post('/user', loginUser)
router.put('/user', validarToken, authorizateAdmin, updateUserByAdmin)
router.put('/client', validarToken, updateUserByClient)
router.delete('/client/:id', validarToken, authorizateAdmin, deleteUserById)
router.delete('/', validarToken, authorizateAdmin, deleteUsers)

export default router