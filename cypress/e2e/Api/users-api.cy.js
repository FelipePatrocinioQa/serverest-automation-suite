import { LOGIN, USERS } from '../../fixtures/api/common/endpoints';
import { GET, POST } from '../../fixtures/api/common/methodRest';
import { JSON_HEADERS } from '../../fixtures/api/common/headers';

import requestBodies from '../../fixtures/payload/send/user-api-bodies.json';
import loginResponse from '../../fixtures/payload/return/login-response.json';
import usersResponse from '../../fixtures/payload/return/users-response.json';
import createUserResponse from '../../fixtures/payload/return/create-user-response.json';
import invalidLoginResponse from '../../fixtures/payload/return/invalid-login-response.json';
import invalidUserResponse from '../../fixtures/payload/return/invalid-user-response.json';

describe('API - ServeRest', () => {
  it('[POST] Should login with valid credentials', () => {
    cy.apiRequest({
      method: POST,
      endpoint: LOGIN,
      body: requestBodies.validLogin,
      headers: JSON_HEADERS
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(loginResponse.message);
      expect(response.body.authorization).to.include(loginResponse.authorizationPrefix);
    });
  });

  it('[GET] Should list users successfully', () => {
    cy.apiRequest({
      method: GET,
      endpoint: USERS,
      headers: JSON_HEADERS
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body.quantidade).to.be.a(usersResponse.quantidadeType);
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an(usersResponse.usuariosType);
    });
  });

  it('[POST] Should create a new user with valid payload', () => {
    const userPayload = {
      ...requestBodies.validUser,
      email: `api.${Date.now()}@${requestBodies.emailDomain}`
    };

    cy.apiRequest({
      method: POST,
      endpoint: USERS,
      body: userPayload,
      headers: JSON_HEADERS
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq(createUserResponse.message);
      expect(response.body._id).to.be.a(typeof createUserResponse._id).and.not.be.empty;
    });
  });

  it('[POST] Should reject login with invalid credentials', () => {
    cy.apiRequest({
      method: POST,
      endpoint: LOGIN,
      body: requestBodies.invalidLogin,
      headers: JSON_HEADERS
    }).then((response) => {
      expect(response.status).to.eq(invalidLoginResponse.status);
      expect(response.body.message).to.eq(invalidLoginResponse.message);
    });
  });

  it('[POST] Should reject user creation when required fields are empty', () => {
    cy.apiRequest({
      method: POST,
      endpoint: USERS,
      body: requestBodies.invalidUser,
      headers: JSON_HEADERS
    }).then((response) => {
      expect(response.status).to.eq(invalidUserResponse.status);
      expect(response.body).to.be.an(invalidUserResponse.bodyType);
      expect(Object.keys(response.body)).to.have.length.greaterThan(0);
    });
  });
});
