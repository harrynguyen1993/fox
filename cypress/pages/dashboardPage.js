import BasePage from "./basePage";
class DashboardPage extends BasePage {
    elements = {
        headerTitle: () => cy.get('.oxd-topbar-header-title'),  // Dashboard header
        menuItems: () => cy.get('.oxd-main-menu-item')          // Sidebar menu
    };

    constructor() {
        super();
        this.dashboardHeading = "h6.oxd-text"; // Change selector based on the dashboard
    }
    validateDashboardPage() {
        this.elements.headerTitle().should('contain', 'Dashboard');
    }

    clickMenuItem(menuName) {
        this.elements.menuItems().contains(menuName).click();
    }
}

module.exports = new DashboardPage();
