describe('Product Composition', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to Product Composition page', () => {
    cy.contains('Product Composition').click();
    cy.url().should('include', '/composition');
  });

  it('should display all navigation links', () => {
    cy.contains('Products').should('be.visible');
    cy.contains('Raw Materials').should('be.visible');
    cy.contains('Product Composition').should('be.visible');
    cy.contains('Production Suggestions').should('be.visible');
  });
});