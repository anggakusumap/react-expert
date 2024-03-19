/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/');

    // visible element in login page
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:5173/');

    // button click
    cy.get('button').contains(/^Login$/).click();

    // verify the toast message
    cy.get('.Toastify__toast-body').should('contain.text', '"email" is not allowed to be empty');
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173/');

    // fill email
    cy.get('#email').type('made@gmail.com');

    // button click
    cy.get('button').contains(/^Login$/).click();

    // verify the toast message
    cy.get('.Toastify__toast-body').should('contain.text', '"password" is not allowed to be empty');
  });

  it('should display alert when email and password are wrong', () => {
    cy.visit('http://localhost:5173/');

    // fill wrong email
    cy.get('#email').type('made@gmail.com');

    // fill wrong password
    cy.get('#password').type('12345678');

    // button click
    cy.get('button').contains(/^Login$/).click();

    // verify the toast message
    cy.get('.Toastify__toast-body').should('contain.text', 'email or password is wrong');
  });

  it('should display homepage when email and password are correct', () => {
    cy.visit('http://localhost:5173/');

    // fill correct email
    cy.get('#email').type('genyolhebat@ex.com');

    // fill correct password
    cy.get('#password').type('genyolhebat');

    // button click
    cy.get('button').contains(/^Login$/).click();

    // visible element in home page
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });
});
