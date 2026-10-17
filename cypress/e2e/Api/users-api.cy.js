import { LOGIN, USERS } from '../../fixtures/api/common/endpoints';
import { GET, POST } from '../../fixtures/api/common/methodRest';
import { JSON_HEADERS } from '../../fixtures/api/common/headers';

import requestBodies from '../../fixtures/payload/send/user-api-bodies.json';
import loginResponse from '../../fixtures/payload/return/login-response.json';
import usersResponse from '../../fixtures/payload/return/users-response.json';
import createUserResponse from '../../fixtures/payload/return/create-user-response.json';

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
});
