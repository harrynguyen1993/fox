import LoginPage from '../pages/LoginPage';

describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('/auth/login');
    });

    it('should log in successfully', () => {
        cy.fixture('users').then(users => {
            const validUser = users.find(user => user.valid);
            LoginPage.login(validUser.username, validUser.password);
            cy.url().should('include', '/dashboard');
        });
    });

    it('should show an error for invalid login', () => {
        cy.fixture('users').then(users => {
            const invalidUser = users.find(user => !user.valid);
            LoginPage.login(invalidUser.username, invalidUser.password);
            LoginPage.getErrorMessage().should('contain', 'Invalid credentials');
        });
    });
});
