describe('Products Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page', () => {
    cy.contains('Production Control System').should('be.visible');
  });

  it('should navigate to Products page', () => {
    cy.contains('Products').click();
    cy.contains('Products Management').should('be.visible');
  });

  it('should display products in a table', () => {
    cy.contains('Products').click();
    cy.get('table').should('exist');
    cy.contains('ID').should('be.visible');
    cy.contains('Name').should('be.visible');
    cy.contains('Price (R$)').should('be.visible');
    cy.contains('Actions').should('be.visible');
  });

  it('should search for a product', () => {
    cy.contains('Products').click();
    cy.get('input[placeholder*="Search products"]').type('Luxury Chair');
    cy.contains('Search').click();
    cy.contains('Luxury Chair').should('be.visible');
  });

  it('should clear search', () => {
    cy.contains('Products').click();
    cy.get('input[placeholder*="Search products"]').type('test');
    cy.contains('Clear').click();
    cy.wait(500);
    cy.get('table').should('exist');
  });

  it('should open new product form', () => {
    cy.contains('Products').click();
    cy.contains('+ New Product').click();
  });

  it('should display Edit and Delete buttons', () => {
    cy.contains('Products').click();
    cy.contains('Edit').should('be.visible');
    cy.contains('Delete').should('be.visible');
  });
});