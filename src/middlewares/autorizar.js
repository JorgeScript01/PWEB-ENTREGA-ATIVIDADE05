export function autorizar(...papeisPermitidos) {

  return (req, res, next) => {

    if (!papeisPermitidos.includes(req.usuario.papel)) {
      return res.status(403).json({
        erro: "Acesso negado"
      });
    }

    next();
  };
}