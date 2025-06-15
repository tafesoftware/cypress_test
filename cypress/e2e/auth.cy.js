///<reference types="cypress" />
describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should toggle between login and signup forms', () => {
    // Initially login form should be visible
    cy.get('#login-form').should('not.have.class', 'hidden');
    cy.get('#signup-form').should('have.class', 'hidden');
    
    // Click signup link
    cy.get('#show-signup').click();
    cy.get('#login-form').should('have.class', 'hidden');
    cy.get('#signup-form').should('not.have.class', 'hidden');
    
    // Click login link
    cy.get('#show-login').click();
    cy.get('#login-form').should('not.have.class', 'hidden');
    cy.get('#signup-form').should('have.class', 'hidden');
  });

  it('should successfully sign up a new user', () => {
    // Go to signup form
    cy.get('#show-signup').click();
    
    // Fill out form
    cy.get('#signup-name').type('New User');
    cy.get('#signup-email').type('new@example.com');
    cy.get('#signup-password').type('newpassword123');
    
    // Submit form
    cy.get('#signup').submit();
    
    // Verify success message and form switch
    cy.get('#signup-message').should('contain', 'Signup successful');
    cy.get('#login-form').should('not.have.class', 'hidden');
  });

  it('should show error for duplicate email', () => {
    // First sign up a user
    cy.get('#show-signup').click();
    cy.get('#signup-name').type('Test User');
    cy.get('#signup-email').type('test@example.com');
    cy.get('#signup-password').type('password123');
    cy.get('#signup').submit();
    
    // Try to sign up again with same email
    cy.get('#show-signup').click();
    cy.get('#signup-name').type('Test User');
    cy.get('#signup-email').type('test@example.com');
    cy.get('#signup-password').type('password123');
    cy.get('#signup').submit();
    
    // Verify error message
    cy.get('#signup-message').should('contain', 'already exists');
  });

  it('should successfully login with valid credentials', () => {
    // First sign up a user
    cy.get('#show-signup').click();
    cy.get('#signup-name').type('Test User');
    cy.get('#signup-email').type('test@example.com');
    cy.get('#signup-password').type('password123');
    cy.get('#signup').submit();
    
    // Login with valid credentials
    cy.get('#login-email').type('test@example.com');
    cy.get('#login-password').type('password123');
    cy.get('#login').submit();
    
    // Verify success message
    cy.get('#login-message').should('contain', 'Welcome back');
  });

  it('should show error for invalid credentials', () => {
    cy.get('#login-email').type('wrong@example.com');
    cy.get('#login-password').type('wrongpassword');
    cy.get('#login').submit();
    
    // Verify error message
    cy.get('#login-message').should('contain', 'Invalid email or password');
  });
});