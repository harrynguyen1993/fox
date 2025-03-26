describe('API Tests', () => {
    it('should return a 200 status on login', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('API_URL')}/public/crocodiles/`,
        }).then(response => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
            expect(response.body.length).to.be.greaterThan(0); // ✅ Use .length
        });
    });
});
