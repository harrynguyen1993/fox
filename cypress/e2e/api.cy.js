describe("API Tests - k6 Public API", () => {
    it("should return a list of public crocodiles with a 200 status", () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env("API_URL")}/public/crocodiles/`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.greaterThan(0);
            console.log("Response Body:", response.body);
        });
    });
});

describe("API Tests - User Authentication", () => {
    it("should fail login with invalid credentials", () => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("API_URL")}/auth/token/login/`,
            body: {
                username: "invalidUser",
                password: "wrongPassword",
            },
            failOnStatusCode: false, // Allows handling errors gracefully
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property("non_field_errors");
        });
    });

    it("should log in successfully with valid credentials and return a token", () => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("API_URL")}/auth/token/login/`,
            body: {
                username: "testUser",
                password: "testPassword123",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("access");
            Cypress.env("authToken", response.body.access);
            console.log("Auth Token:", response.body.access);
        });
    });

    it("should get user details using the token", () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env("API_URL")}/auth/users/me/`,
            headers: {
                Authorization: `Bearer ${Cypress.env("authToken")}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("username");
            console.log("User Details:", response.body);
        });
    });
});
