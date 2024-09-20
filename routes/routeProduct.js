import express from 'express'
import { deleteProductById, deleteProducts, getAllProducts, getProductById, postProduct, updateProduct } from '../controllers/controllerProduct.js'
import { validarToken } from '../utils/token.js'
import { authorizateAdmin } from '../utils/validateAdmin.js'

const router = express.Router()

router.get('/', validarToken, getAllProducts)
router.get('/product/:id', validarToken, getProductById)
router.post("/", postProduct)
router.put("/product", validarToken, authorizateAdmin, updateProduct)
router.delete("/product/:id", validarToken, authorizateAdmin, deleteProductById)
router.delete("/", validarToken, authorizateAdmin, deleteProducts)

export default router