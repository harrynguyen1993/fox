import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

describe("Dashboard Page Tests", () => {
    beforeEach(() => {
        // Open login page and perform login
        cy.visit("/auth/login");
        LoginPage.login("Admin", "admin123");

        // Validate successful login and navigation to Dashboard
        DashboardPage.validateDashboardPage();
    });

    it("should display the correct Dashboard title", { tags: ["sanity"] }, () => {
        DashboardPage.elements.headerTitle().should("contain.text", "Dashboard");
    });

    it("should navigate to different menu items and validate URLs",  { tags: ["regression"] } ,() => {
        const menuTests = [
            { menu: "Admin", urlFragment: "/admin/viewSystemUsers" },
            { menu: "PIM", urlFragment: "/pim/viewEmployeeList" },
            { menu: "Leave", urlFragment: "/leave/viewLeaveList" },
            { menu: "Time", urlFragment: "/time/viewEmployeeTimesheet" },
        ];

        menuTests.forEach(({ menu, urlFragment }) => {
            DashboardPage.clickMenuItem(menu);
            cy.url().should("include", urlFragment);
            cy.contains("h6", menu).should("be.visible"); // Validate header
        });
    });
});

describe("Dashboard Menu Verification", () => {
    beforeEach(() => {
        // Open login page and perform login
        cy.visit("/auth/login");
        LoginPage.login("Admin", "admin123");

        // Validate successful login
        DashboardPage.validateDashboardPage();
    });

    it("should display all expected menu items on the left sidebar", { tags: ["sanity", "regression"] },() => {
        const expectedMenuItems = [
            "Admin",
            "PIM",
            "Leave",
            "Time",
            "Recruitment",
            "My Info",
            "Performance",
            "Dashboard",
            "Directory",
            "Maintenance",
            "Claim",
            "Buzz"
        ];

        cy.get(".oxd-main-menu-item").should("have.length", expectedMenuItems.length);

        expectedMenuItems.forEach((item) => {
            cy.contains(".oxd-main-menu-item", item).should("be.visible");
        });
    });
});
