describe('Complete Production Flow - E2E', () => {
  it('should complete a full production workflow', () => {
    cy.visit('/');
    cy.contains('Production Control System').should('be.visible');

    cy.contains('Raw Materials').click();
    cy.contains('Raw Materials Management').should('be.visible');
    
    cy.get('table').should('exist');
    
    cy.contains('Products').click();
    cy.contains('Products Management').should('be.visible');
    
    cy.get('table').should('exist');
    
    cy.contains('Production Suggestions').click();
    cy.contains('Production Suggestions').should('be.visible');
    
    cy.contains('Calculate Production Suggestions').should('be.visible');
    cy.contains('Calculate Production Suggestions').click();
    
    cy.wait(1000);
    
    cy.contains('Products').click();
    cy.contains('Products Management').should('be.visible');
    
    cy.contains('Raw Materials').click();
    cy.contains('Raw Materials Management').should('be.visible');
    
    cy.contains('Product Composition').click();
    
    cy.contains('Production Suggestions').click();
    cy.contains('Production Suggestions').should('be.visible');
  });

  it('should navigate through all main sections without errors', () => {
    cy.visit('/');
    
    const sections = [
      'Products',
      'Raw Materials',
      'Product Composition',
      'Production Suggestions'
    ];
    
    sections.forEach(section => {
      cy.contains(section).click();
      cy.wait(500);
    });
  });
});