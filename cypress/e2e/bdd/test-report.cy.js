describe("Sample Report Test", () => {
    it("Should pass and generate report", () => {
      cy.visit("https://example.cypress.io");
      cy.contains("type").click();
      cy.url().should("include", "/commands/actions");
    });
  });

  