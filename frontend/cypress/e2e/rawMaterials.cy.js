describe('Raw Materials Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to Raw Materials page', () => {
    cy.contains('Raw Materials').click();
    cy.contains('Raw Materials Management').should('be.visible');
  });

  it('should display raw materials in a table', () => {
    cy.contains('Raw Materials').click();
    cy.get('table').should('exist');
    cy.contains('ID').should('be.visible');
    cy.contains('Name').should('be.visible');
    cy.contains('Stock Quantity').should('be.visible');
    cy.contains('Actions').should('be.visible');
  });

  it('should display filter buttons', () => {
    cy.contains('Raw Materials').click();
    cy.contains('Show All').should('be.visible');
    cy.contains('Show Only In Stock').should('be.visible');
  });

  it('should filter by in stock items', () => {
    cy.contains('Raw Materials').click();
    cy.contains('Show Only In Stock').click();
  });

  it('should open new raw material form', () => {
    cy.contains('Raw Materials').click();
    cy.contains('+ New Raw Material').click();
  });

  it('should display Edit and Delete buttons', () => {
    cy.contains('Raw Materials').click();
    cy.contains('Edit').should('be.visible');
    cy.contains('Delete').should('be.visible');
  });
});