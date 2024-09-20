export function authorizateAdmin(req, res, next) {
    // Verificar si el usuario tiene el rol cliente
    
    if (req.usuario && req.usuario.rol === 'admin') {
      // Si el usuario tiene el rol cliente, continuar con la siguiente función en la cadena de middleware
      next();
    } else {
      // Si el usuario no tiene el rol cliente, devolver un mensaje de error y prohibir el acceso
      res.status(403).json({ message: 'Acceso prohibido: Se requiere rol de administrador.' });
    }
  }