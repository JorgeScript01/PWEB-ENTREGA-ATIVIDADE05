export class AuthController {

  constructor(service) {
    this.service = service;
  }

  async registrar(req, res) {

    try {

      const usuario = await this.service.registrar(req.body);

      res.status(201).json(usuario);

    } catch (err) {

      if (err.message === "Email já cadastrado") {
        return res.status(409).json({
          erro: err.message
        });
      }

      res.status(400).json({
        erro: err.message
      });
    }
  }

  async login(req, res) {

    try {

      const token = await this.service.login(req.body);

      res.json(token);

    } catch (err) {

      res.status(401).json({
        erro: err.message
      });
    }
  }
}