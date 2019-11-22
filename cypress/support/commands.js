import { cyan } from "colors";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// login option
Cypress.Commands.add("login", (userName, password) => {
  sessionStorage.clear();
  cy.visit('/login');
  // 注册
  cy.get('[class*=register_icon]').parent().click();
  cy.get('#userNameInput').type(userName);
  cy.get('#ageInput').type('23');
  cy.get('#genderInput').type('男');
  cy.get('#passwordInput').type(password);
  cy.get('[class*=submit_button]').contains('提交').click();
  cy.wait(500);
  // 登陆
  cy.get('#username').type('wtz');
  cy.get('#password').type('1234');
  cy.get('[class*=login_button]').click();
  cy.wait(500);
  cy.get('[class*=index_container]').should('be.visible');
});
