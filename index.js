import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'
import routeUsers from './routes/routeUser.js';
import routerProducts from './routes/routeProduct.js';
import routerOrders from './routes/routeOreder.js';
config()

const app = express();

// Configuración de permisos CORS para métodos específicos

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use("/users", routeUsers)
app.use('/products', routerProducts)
app.use('/orders', routerOrders)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})