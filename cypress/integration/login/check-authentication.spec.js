describe('check authentication', () => {
  it('whitout authentication token should return login page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  })
});