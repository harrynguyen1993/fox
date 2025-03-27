describe("API Tests - k6 Public API", { tags: ["sanity", "smoke"] }, () => {
    it("should return a list of public crocodiles with a 200 status", { tags: ["smoke"] }, () => {
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
    it("should fail login with invalid credentials smoke", { tags: ["smoke"] }, () => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("API_URL")}/auth/token/login/`,
            body: {
                username: "invalidUser",
                password: "wrongPassword",
            },
            failOnStatusCode: false, // Allows handling errors gracefully
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("should log in successfully with valid credentials and return a token", { tags: ["smoke"] }, () => {
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
});
