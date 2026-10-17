import 'cypress-plugin-api';
import { LOGIN } from '../fixtures/api/common/endpoints';
import { POST } from '../fixtures/api/common/methodRest';
import { JSON_HEADERS } from '../fixtures/api/common/headers';
import requestBodies from '../fixtures/payload/send/user-api-bodies.json';

const apiBaseUrl = () => Cypress.env('apiBaseUrl') || 'https://serverest.dev';

Cypress.Commands.add('apiLogin', (credentials = requestBodies.validLogin) => {
  return cy.apiRequest({
    method: POST,
    endpoint: LOGIN,
    headers: JSON_HEADERS,
    body: credentials
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('authorization');
    expect(response.body.authorization).to.include('Bearer');
    return response.body.authorization;
  });
});

Cypress.Commands.add('apiRequest', ({ method, endpoint, body = undefined, headers = {}, qs = undefined, failOnStatusCode = false }) => {
  return cy.api({
    method,
    url: `${apiBaseUrl()}${endpoint}`,
    body,
    headers,
    qs,
    failOnStatusCode
  });
});

Cypress.Commands.add('loginAsAdmin', () => {
  return cy.apiLogin();
});
