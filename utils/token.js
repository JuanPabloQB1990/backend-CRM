import jwt from 'jsonwebtoken';

// Función para generar el token JWT
export function generarToken(payload) {
  
  // Generar el token con el payload y la clave secreta
  const token = jwt.sign(payload, process.env.CLAVE_SECRETA, { expiresIn: '1h' }); // El token expira en 1 hora

  return token;
}

// Middleware para validar el token JWT en las solicitudes
export function validarToken(req, res, next) {
  // Obtener el token de las cabeceras de la solicitud
  const token = req.headers.authorization;
  
  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token utilizando la clave secreta
    //console.log(process.env.CLAVE_SECRETA);
    const decoded = jwt.verify(token, process.env.CLAVE_SECRETA);
    
    // Adjuntar la información del usuario decodificado a la solicitud para su uso posterior
    req.usuario = decoded;

    // Continuar con la siguiente función en la cadena de middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}