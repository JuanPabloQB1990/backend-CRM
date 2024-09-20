import { check, validationResult } from "express-validator";
import { pool } from "../db/conection.js";
import { comparePasswords, hashPassword } from "../utils/hashear.js";
import { generarToken, validarToken } from "../utils/token.js";

const getAllUsers = (req, res) => {
  try {
    pool.execute("SELECT * FROM users", (err, results, fields) => {
      if (err) {
        res.json("Error al realizar la consulta: " + err);
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = (req, res) => {
  try {
    pool.execute(
      "SELECT u.id, u.name, u.email FROM users AS u WHERE id = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          throw new Error(err);
        }
        if (result.length == 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(result[0]);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  if (req.body.name === "") {
    await check("name")
      .notEmpty()
      .withMessage("el nombre es requerida")
      .run(req);
  } else {
    await check("name")
      .isLength({ min: 5 })
      .withMessage("requiere minimo 5 caracteres")
      .run(req);
  }

  if (req.body.email === "") {
    await check("email")
      .notEmpty()
      .withMessage("el email es requerido")
      .run(req);
  } else {
    await check("email")
      .isEmail()
      .withMessage("el email no es valido")
      .run(req);
  }

  if (req.body.password === "") {
    await check("password")
      .notEmpty()
      .withMessage("la password es requerida")
      .run(req);
  } else {
    await check("password")
      .isLength({ min: 6 })
      .withMessage("minimo 6 caracteres")
      .run(req);
  }
  await check("repeat_password")
    .equals(req.body.password)
    .withMessage("las password no coinciden")
    .run(req);

  let resultado = validationResult(req); // crea un array de errores

  if (!resultado.isEmpty()) {
    return res.status(400).json(resultado.array());
  }

  const { name, email, country, city, rol, password } =
    req.body;
  console.log(req.body);
  try {
    pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return console.log(err);
        }

        if (result.length > 0) {
          return res
            .status(404)
            .json({ message: "Este email ya se encuentra registrado" });
        }

        const hasheadaPassword = await hashPassword(password);
        pool.execute(
          "INSERT INTO users (`id`, `name`,`email`,`rol`, `password`)values(?,?,?,?,?)",
          [null, name, email, rol, hasheadaPassword],
          (err) => {
            if (err) {
              throw new Error(err);
            }

            return res.status(200).json({ message: "registro satisfactorio" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  if (req.body.email === "") {
    await check("email")
      .notEmpty()
      .withMessage("el email obligatorio")
      .run(req);
  } else {
    await check("email")
      .isEmail()
      .withMessage("el email no es valido")
      .run(req);
  }
  await check("password")
    .notEmpty()
    .withMessage("Ingresa porfavor tu password")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.status(400).json(resultado.array());
  }

  try {
    pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [req.body.email],
      async (err, result) => {
        if (err) {
          throw new Error(err);
        }

        if (result.length === 0) {
          return res
            .status(404)
            .json({ message: "Este email no se encuentra registrado" });
        }

        const { id, name, email, rol, password } = result[0];

        const correctPassword = await comparePasswords(
          req.body.password,
          password
        );

        if (correctPassword) {
          const token = generarToken({ id, rol });
          return res.json({
            id,
            token,
            rol,
          });
        } else {
          res.status(406).json({ message: "contraseña incorrecta" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const updateUserByAdmin = (req, res) => {
  
  const { id, rol } = req.body;

  try {
    pool.execute(
      "UPDATE `users` SET `rol` = ? WHERE `id` = ?",
      [rol, id],
      async (err, fields) => {
        if (err) {
          throw new Error(err);
        }

        if (fields.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario Editado" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const updateUserByClient = async (req, res) => {
  const { id, name, email, country, city } = req.body;

  
    pool.execute(
      "UPDATE `users` SET `name` = ?, `email` = ? WHERE `id` = ?",
      [name, email, id],
      async (err, fields) => {
        if (err) {
          throw new Error(err);
        }

        if (fields.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario Editado" });
      }
    );
  
};

const deleteUserById = (req, res) => {
  console.log(req.params);

  try {
    
    pool.execute(
      "DELETE FROM `users` WHERE `id` = ?",
      [req.params.id],
      (err) => {
        if (err instanceof Error) {
          throw new Error(err);
        }

        return res.json({ message: "Usuario eliminado" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteUsers = (req, res) => {
  try {
    
    pool.execute(
      `DELETE FROM users WHERE id IN(${req.body.ids.join(", ")})`,
      (err) => {
        if (err instanceof Error) {
          throw new Error(err);
        }

        return res.json({ message: "Usuarios eliminados" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUserByAdmin,
  updateUserByClient,
  deleteUserById,
  deleteUsers,
};
