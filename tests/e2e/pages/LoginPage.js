export class LoginPage {

  constructor(page) {
    this.page = page;
  }

  async acessar() {
    await this.page.goto("/login");
  }

  async preencherEmail(email) {
    await this.page.fill("#email", email);
  }

  async preencherSenha(senha) {
    await this.page.fill("#senha", senha);
  }

  async clicarEntrar() {
    await this.page.click("button");
  }

  async login(email, senha) {
    await this.acessar();
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.clicarEntrar();
  }
}