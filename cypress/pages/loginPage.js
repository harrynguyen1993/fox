import BasePage from './basePage';

class LoginPage extends BasePage {
    elements = {
        usernameInput: () => cy.get("input[name='username']"),
        passwordInput: () => cy.get("input[name='password']"),
        loginButton: () => cy.get("button[type='submit']"),
        errorMessage: () => cy.get(".oxd-alert-content")
    }

    login(username, password) {
        this.elements.usernameInput().type(username);
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
    }

    getErrorMessage() {
        return this.elements.errorMessage();
    }
}

export default new LoginPage();
