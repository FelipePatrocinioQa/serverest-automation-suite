const LoginElements = {
  emailInput: () => cy.get('input[placeholder="Digite seu email"]'),
  passwordInput: () => cy.get('input[placeholder="Digite sua senha"]'),
  submitButton: () => cy.contains('button', 'Entrar'),
  errorMessage: () => cy.contains('Email e/ou senha inválidos'),
  registerLink: () => cy.contains('Cadastre-se')
};

export default LoginElements;