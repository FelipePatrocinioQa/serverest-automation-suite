const RegisterElements = {
  nameInput: () => cy.get('input[placeholder="Digite seu nome"]'),
  emailInput: () => cy.get('input[placeholder="Digite seu email"]'),
  passwordInput: () => cy.get('input[placeholder="Digite sua senha"]'),
  adminCheckbox: () => cy.contains('label', 'Cadastrar como administrador?'),
  submitButton: () => cy.contains('button', 'Cadastrar'),
  successMessage: () => cy.contains('Cadastro realizado com sucesso'),
  loginLink: () => cy.contains('Entrar')
};

export default RegisterElements;