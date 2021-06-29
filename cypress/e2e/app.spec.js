import Color from 'color';

const themes = require('../../src/theme/Themes').Themes;

describe('App e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // TODO: make api calls cancellable and cancel them on unmount
  Cypress.on('uncaught:exception', (err, runnable) => false);

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
    // This will allow support for users that have set their OS dark mode preference
    let initialColor = themes.default.BACKGROUND_LIGHT;
    let oppositeColor = themes.night.BACKGROUND_LIGHT;

    cy.findByTestId('theme-switcher').then(el => {
      if (el.css('background-color') !== Color(themes.default.INPUT_BG_DARK).string()) {
        initialColor = themes.night.BACKGROUND_LIGHT;
        oppositeColor = themes.default.BACKGROUND_LIGHT;
      }

      cy.findByTestId('page-wrapper').should(
        'have.css',
        'background-color',
        Color(initialColor).string()
      );

      cy.findByTestId('theme-switcher').click();

      cy.findByTestId('page-wrapper').should(
        'have.css',
        'background-color',
        Color(oppositeColor).string()
      );

      cy.visit('/');

      for (let x = 0; x < 10; x++) {
        cy.findByTestId('theme-switcher').click();
      }

      cy.findByTestId('page-wrapper').should(
        'have.css',
        'background-color',
        Color(themes.rainbow.BACKGROUND_LIGHT).string()
      );

      cy.findByTestId('theme-switcher').click();

      cy.findByTestId('page-wrapper').should(
        'have.css',
        'background-color',
        Color(themes.night.BACKGROUND_LIGHT).string()
      );
    });
  });

  // TODO: Either refactor away from data-testId or add the ids throghout
  it.skip('smoke test', () => {
    cy.url().should('contain', '/dashboard');
    cy.findByTestId('block-height').click();

    cy.findByTestId('navlink-dashboard').click();

    cy.findByText(/\d*\/\d* validators/i).click();

    cy.findByText(/block hash/i).should('exist');

    cy.findByTestId('block-details').findByRole('link').click();

    cy.findByTestId('navlink-transactions').click();

    cy.findByRole('button', { name: '5' }).click();

    cy.findByTestId(/form-status/i).click();

    cy.findByTestId(/form-status/i)
      .findByText(/failure/i)
      .click();

    cy.findByText(/apply/i).click();
  });
});
