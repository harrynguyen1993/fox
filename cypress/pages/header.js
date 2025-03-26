class Header {
    constructor() {
        this.userDropdown = '.oxd-userdropdown-name';
        this.logoutButton = 'a[href="/web/index.php/auth/logout"]';
    }

    clickUserDropdown() {
        cy.get(this.userDropdown).click();
    }

    logout() {
        this.clickUserDropdown();
        cy.get(this.logoutButton).click();
    }
}

export default new Header();
