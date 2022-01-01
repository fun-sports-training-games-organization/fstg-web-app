describe('FSTG login', () => {
    beforeEach(() => {
        cy.intercept('GET', '/locales/en*/translation.json', { fixture: 'translation-en.json' }).as(
            'englishTranslations'
        );
        cy.visit('http://localhost:3000/login');
        cy.wait('@englishTranslations');
    });

    it('should show Login with Google, Facebook, and Twitter options', () => {
        cy.get('[data-cy="login-with-google"]').should('be.visible');
        cy.get('[data-cy="login-with-facebook"]').should('not.exist');
        cy.get('[data-cy="login-with-twitter"]').should('be.visible');
    });
});
