import LoginPage from '../../pageObject/LoginPage';
import RegisterPage from '../../pageObject/RegisterPage';
import testData from '../../fixtures/massadeteste/web-test-data.json';

describe('Frontend - ServeRest', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('[Login] Should login with valid credentials', () => {
    LoginPage.login(testData.validLogin.email, testData.validLogin.password);
    cy.location('pathname').should('not.eq', '/login');
  });

  it('[Login] Should show an error message for invalid credentials', () => {
    LoginPage.login(testData.invalidLogin.email, testData.invalidLogin.password);
    LoginPage.getErrorMessage().should('be.visible').and('contain.text', testData.messages.invalidCredentials);
  });

  it('[Login] Should reject a valid account with an incorrect password', () => {
    LoginPage.login(testData.wrongPasswordLogin.email, testData.wrongPasswordLogin.password);
    LoginPage.getErrorMessage().should('be.visible').and('contain.text', testData.messages.invalidCredentials);
  });

  it('[Register] Should register a new user through the UI', () => {
    LoginPage.goToRegister();

    const newUser = {
      ...testData.registerUser,
      email: testData.registerUser.email.replace('{timestamp}', Date.now())
    };

    RegisterPage.fillForm(newUser);
    RegisterPage.submit();
    RegisterPage.getSuccessMessage().should('be.visible').and('contain.text', 'Cadastro realizado com sucesso');
  });

  it('[Register] Should reject an email that is already registered', () => {
    LoginPage.goToRegister();
    RegisterPage.fillForm(testData.duplicateRegisterUser);
    RegisterPage.submit();
    RegisterPage.getDuplicateEmailMessage()
      .should('be.visible')
      .and('contain.text', testData.messages.duplicateEmail);
  });
});
