describe('Proposals e2e', () => {
  beforeEach(() => {
    cy.visit('/proposals');
  });

  it('should show the correct titles', () => {
    cy.title().should('equal', 'Provenance Explorer - All Proposals');
    cy.get('h2').should('contain', 'All Proposals');
    cy.get('h3').should('contain', 'Proposals List');
  });

  it('should have the correct table headers', () => {
    cy.findByText(/^ID$/).should('exist');
    cy.findByText(/^Title$/).should('exist');
    cy.findByText(/^Status$/).should('exist');
    cy.findByText(/^Deposit Percentage$/).should('exist');
    cy.findByText(/^Submit Time$/).should('exist');
    cy.findByText(/^Deposit End Time$/).should('exist');
    cy.findByText(/^Voting End Time$/).should('exist');
  });

  it('should render the list correctly', () => {
    cy.log('TODO: Need to mock the data and make sure it renders the mock data correctly');
  });
});
