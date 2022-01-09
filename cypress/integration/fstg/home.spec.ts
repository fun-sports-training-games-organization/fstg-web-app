describe('FSTG login', () => {
    beforeEach(() => {
        cy.intercept('GET', '/locales/en*/translation.json?v=*', { fixture: 'translation-en.json' }).as(
            'englishTranslations'
        );
        cy.visit('http://localhost:3000/');
        cy.wait('@englishTranslations');
    });

    it('should redirect to login route when not signed in', () => {
        cy.url().should('include', 'login');
    });
});
