import { pool } from "../db/conection.js";

export const getAllProducts = (req, res) => {
  try {
    pool.execute(
      "SELECT * FROM `products`",
      (err, rows, fields) => {
        if (err instanceof Error) {
          throw new Error(err);
        }

        return res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = (req, res) => {
  try {
    pool.execute(
      "SELECT * FROM `products` WHERE p.id = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (err instanceof Error) {
          throw new Error(err);
        }

        return res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const postProduct = async (req, res) => {
  const { name, description, price, quantity} = req.body;
  
  try {
    pool.execute(
      "INSERT INTO `products`(`name`, `description`, `price`, `quantity`) VALUES (?, ?, ?, ?)",
      [name, description, price, quantity],
      (err) => {
        if (err) {
          throw new Error(err);
        }

        res.status(201).json({ message: "Producto guardado" });
      }
    );
  } catch (err) {
    console.log("Siguiente error: ", err);
  }
};

export const updateProduct = async(req, res) => {
  
  const { id, name, description, price } = req.body;
  console.log(req.body);
    try {
      pool.execute(
        "UPDATE `products` SET `name` = ?, `description` = ?, `price` = ? WHERE `id` = ?",
        [name, description, price, id],
        (err, fields) => {
          if (err) {
            throw new Error(err);
          }
  
          if (fields.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
          }
  
          res.status(200).json({ message: "Producto Editado" });
        }
      );
    } catch (err) {
      console.log("Siguiente error: ", err);
    } 
};

export const deleteProductById = (req, res) => {
  
  try {

    pool.execute(
      "DELETE FROM `products` WHERE `id` = ?",
      [req.params.id],
      (err, fields) => {
        if (err instanceof Error) {
          throw new Error(err);
        }
        
        return res.json({ message: "Producto eliminado" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteProducts = (req, res) => {
  
  try {
    
    pool.execute(
      `DELETE FROM products WHERE id IN(${req.body.ids.join(', ')})`,
      (err) => {
        if (err instanceof Error) {
          throw new Error(err);
        }
        
        return res.json({ message: "Productos eliminados" });
      }
    );
     
  } catch (error) {
    console.log(error);
  } 
}




