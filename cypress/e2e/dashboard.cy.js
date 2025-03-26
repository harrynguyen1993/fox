import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

describe("Dashboard Page Tests", () => {
    beforeEach(() => {
        cy.visit("/auth/login");  // Open login page

        // Login first
        LoginPage.login("Admin", "admin123");
        // Validate that login was successful
        DashboardPage.validateDashboardPage();
    });

    it("should display the Dashboard title", () => {
        DashboardPage.elements.headerTitle().should("contain", "Dashboard");
    });

    it("should navigate to different menu items", () => {
        DashboardPage.clickMenuItem("Admin");
        cy.url().should("include", "/admin/viewSystemUsers");
        
        DashboardPage.clickMenuItem("PIM");
        cy.url().should("include", "/pim/viewEmployeeList");
    });
});
