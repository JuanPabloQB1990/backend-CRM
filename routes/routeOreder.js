import express from 'express'
import { validarToken } from '../utils/token.js'
import { authorizateAdmin } from '../utils/validateAdmin.js'
import { postOrder, postProductOrder, getProductsOrder, updateProductsOrder, deleteProductsOrder, changeOrderClient, countOrdersPourMonth, getOrders } from '../controllers/controllerOrder.js'

const router = express.Router()

router.post("/", validarToken, authorizateAdmin, postOrder)
router.post("/product", validarToken, authorizateAdmin, postProductOrder)
router.get("/products/:idClient", validarToken, authorizateAdmin, getProductsOrder)
router.get("/", validarToken, authorizateAdmin, getOrders)
router.put("/products", validarToken, authorizateAdmin, updateProductsOrder)
router.delete("/products", validarToken, authorizateAdmin, deleteProductsOrder)
router.post("/client/:idAdmin", validarToken, authorizateAdmin, changeOrderClient)
router.post("/counts", validarToken, authorizateAdmin, countOrdersPourMonth)

export default router