describe('NewStudent Component', () => {
    beforeEach(() => {
        // Navigate to the screen where the NewStudent component is rendered
        cy.visit('http://localhost:8081/');
    });
    it('should filter students based on search query', () => {
        cy.visit('http://localhost:8081/');
        cy.wait(2000);
        cy.get('input[placeholder="Search by student name"]').type('Selina');

        // Assuming there is a student named Max in the list
        cy.contains('Selina').should('exist');

    });
});