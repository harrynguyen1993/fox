class BasePage {
    visit(path) {
        cy.visit(path);
    }

    clickElement(selector) {
        cy.get(selector).click();
    }

    enterText(selector, text) {
        cy.get(selector).type(text);
    }

    verifyText(selector, expectedText) {
        cy.get(selector).should('contain', expectedText);
    }
}

export default BasePage;
