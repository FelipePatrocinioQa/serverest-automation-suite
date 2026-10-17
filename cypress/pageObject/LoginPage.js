import LoginElements from '../Elements/LoginElements';

class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  fillCredentials(email, password) {
    LoginElements.emailInput().clear().type(email);
    LoginElements.passwordInput().clear().type(password);
    return this;
  }

  submit() {
    LoginElements.submitButton().click();
    return this;
  }

  login(email, password) {
    this.fillCredentials(email, password);
    this.submit();
    return this;
  }

  getErrorMessage() {
    return LoginElements.errorMessage();
  }

  goToRegister() {
    LoginElements.registerLink().click();
    return this;
  }
}

export default new LoginPage();