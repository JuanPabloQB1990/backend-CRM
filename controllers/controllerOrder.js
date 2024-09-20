import { pool } from "../db/conection.js";

export const postOrder = (req, res) => {
  const { fecha, id_client, id_admin, total, products } = req.body;
    
  try {
    pool.execute(
      "INSERT INTO `orders`(`fecha`, `id_client`, `total`, `products`) VALUES (?, ?, ?, ?)",
      [fecha, id_client, total, JSON.stringify( products)],
      (err) => {
        if (err) {
          throw new Error(err);
        }else{
          pool.execute("DELETE FROM `client_prod` WHERE `id_client` = ?", [id_client],
            (err) => {
              if (err) {
                throw new Error(err);
              }
      
              //res.status(200);
            }
          );

          pool.execute(
            "UPDATE users SET `clientOrder` = null WHERE `id` = ?",
            [id_admin],
            (err) => {
              if (err) {
                throw new Error(err);
              }
      
              //res.status(200).json({ message: "cliente actualizado" });
            }
          );
        }

        res.status(201).json({ message: "Orden Creada" });
      }
    );



  } catch (err) {
    console.log("Siguiente error: ", err);
  }
}

export const getOrders = (req, res) => {
  try {
    pool.execute(
      "SELECT * FROM `orders`",
      (err, rows) => {
        if (err) {
          throw new Error(err);
        }

        res.status(200).json(rows);
      }
    );
  } catch (error) {
    console.log(error);
    
  }
}

export const postProductOrder = (req, res) => {
  
  const { id_client, id_product, quantityOrder} = req.body;
  
  try {

    pool.execute(
      "SELECT * FROM `client_prod` WHERE `id_client` = ? AND `id_prod` = ?",
      [id_client, id_product],
      (err, rows) => {
        if (err) {
          throw new Error(err);
        }
        
        if (rows.length > 0) {
          return res.status(401).json({ message: "Este Producto ya fue agregado al pedido" });
           
        }else{

          pool.execute(
            "INSERT INTO `client_prod` (`id_client`, `id_prod`, `quantityOrder`) VALUES (?, ?, ?)",
            [id_client, id_product, quantityOrder],
            (err) => {
              if (err) {
                throw new Error(err);
              }
      
              res.status(201).json({ message: "Producto Agregado al pedido" });
            }
          );
        }
      }
    );

  } catch (error) {
    console.log(error);
  }
}

export const getProductsOrder = (req, res) => {

  try {
    pool.execute(
      "SELECT *, products.name, users.name AS firstname FROM client_prod INNER JOIN users ON users.id = id_client INNER JOIN products ON products.id = id_prod WHERE id_client = ?",
      [req.params.idClient],
      (err, rows) => {
        if (err) {
          throw new Error(err);
        }

        if (rows.length > 0) {
          
          return res.status(200).json(rows);
          
        } else {
          res.status(404).json({message: 'No se encontraron productos en la orden'});
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export const updateProductsOrder = (req, res) => {
  const { quantity, id_product, id_client } = req.body;
  
  try {
    pool.execute(
      "UPDATE client_prod SET `quantityOrder` = ? WHERE `id_client` = ? AND `id_prod` = ?",
      [quantity, id_client, id_product],
      (err) => {
        if (err) {
          throw new Error(err);
        }

        res.status(200).json({ message: "Cantidad actualizada" });
      }
    );
  } catch (error) {
    console.log(error);
    
  }
}

export const deleteProductsOrder = (req, res) => {
  
  const { id_product, id_client } = req.body;
  
  try {
    pool.execute(
      "DELETE FROM `client_prod` WHERE `id_client` = ? AND `id_prod` = ?",
      [id_client, id_product],
      (err) => {
        if (err) {
          throw new Error(err);
        }

        res.status(200).json({ message: "Producto eliminado de la orden" });
      }
    );
  } catch (error) {
    console.log(error);
    
  }
}

export const changeOrderClient = (req, res) => {
  
  const client = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email
  }
  
  try {
    pool.execute(
      "UPDATE users SET `clientOrder` = ? WHERE `id` = ?",
      [client, req.params.idAdmin],
      (err) => {
        if (err) {
          throw new Error(err);
        }

        res.status(200).json({ message: "cliente actualizado" });
      }
    );
  } catch (error) {
    console.log(error);
    
  }
}

export const countOrdersPourMonth = (req, res) => {
  
  const { currentMonth, currentYear } = req.body
  
  try {
    pool.execute(
      "SELECT COUNT(*) AS cantidad, fecha FROM orders WHERE MONTH(fecha) <= ? AND YEAR(fecha) = ? GROUP BY MONTH(fecha) ORDER BY MONTH(fecha)",
      [currentMonth, currentYear],
      (err, rows) => {
        if (err) {
          throw new Error(err);
        }
        
        res.status(200).json(rows);
      }
    );
  } catch (error) {
    console.log(error);
    
  }
}






