import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Juanpablo1990',
    database: 'store',
    port: 3306
});

pool.getConnection(function (err, connection) {
  if (err instanceof Error) {
    console.log(err);
    return;
  }

  console.log('Conexion correcta.');

  connection.release();
});