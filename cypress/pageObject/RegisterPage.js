import RegisterElements from '../Elements/RegisterElements';

class RegisterPage {
  visit() {
    cy.visit('/cadastrarusuarios');
    return this;
  }

  fillForm({ nome, email, password, isAdmin = false }) {
    RegisterElements.nameInput().clear().type(nome);
    RegisterElements.emailInput().clear().type(email);
    RegisterElements.passwordInput().clear().type(password);

    if (isAdmin) {
      RegisterElements.adminCheckbox().click();
    }

    return this;
  }

  submit() {
    RegisterElements.submitButton().click();
    return this;
  }

  getSuccessMessage() {
    return RegisterElements.successMessage();
  }

  getDuplicateEmailMessage() {
    return RegisterElements.duplicateEmailMessage();
  }

  goToLogin() {
    RegisterElements.loginLink().click();
    return this;
  }
}

export default new RegisterPage();