import Color from 'color';

const themes = require('../../src/theme/Themes').Themes;

describe('App e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show 404', () => {
    cy.visit('/garbage-url');
    cy.findByText(/404/i).should('exist');

    cy.visit('/');
    cy.visit('/404');
    cy.findByText(/404/i).should('exist');

    cy.findByText(/back/i).click();
    cy.url().should('contain', '/dashboard');
  });

  it('should handle the theme switcher', () => {
    cy.findByTestId('page-wrapper').should('have.css', 'background-color', Color(themes.default.BACKGROUND_LIGHT).string());

    cy.findByTestId('theme-switcher').click();

    cy.findByTestId('page-wrapper').should('have.css', 'background-color', Color(themes.night.BACKGROUND_LIGHT).string());

    cy.visit('/');

    for (let x = 0; x < 10; x++) {
      cy.findByTestId('theme-switcher').click();
    }

    cy.findByTestId('page-wrapper').should('have.css', 'background-color', Color(themes.rainbow.BACKGROUND_LIGHT).string());
  });

  it('smoke test', () => {
    cy.url().should('contain', '/dashboard');
    cy.findByTestId('block-height').click();

    cy.findByTestId('navlink-dashboard').click();

    cy.findByTestId('voting-power').findByRole('link').click();

    cy.findByText(/block hash/i).should('exist');

    cy.findByTestId('block-details').findByRole('link').click();

    cy.findByTestId('navlink-transfer').click();

    cy.findByRole('button', { name: '5' }).click();

    cy.findByTestId(/form-status/i).click();

    cy.findByTestId(/form-status/i)
      .findByText(/failure/i)
      .click();

    cy.findByText(/apply/i).click();
  });
});
