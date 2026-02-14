describe('Production Suggestions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to Production Suggestions page', () => {
    cy.contains('Production Suggestions').click();
    cy.contains('Production Suggestions').should('be.visible');
  });

  it('should display instructions', () => {
    cy.contains('Production Suggestions').click();
    cy.contains('Calculate what can be produced with available raw materials stock').should('be.visible');
  });

  it('should display calculate button', () => {
    cy.contains('Production Suggestions').click();
    cy.contains('Calculate Production Suggestions').should('be.visible');
  });

  it('should display help text', () => {
    cy.contains('Production Suggestions').click();
    cy.contains('Click the button above to calculate production suggestions').should('be.visible');
    cy.contains('The system will analyze available raw materials stock and suggest which products can be manufactured, prioritizing by highest value.').should('be.visible');
  });

  it('should calculate production suggestions', () => {
    cy.contains('Production Suggestions').click();
    cy.contains('Calculate Production Suggestions').click();
  });
});