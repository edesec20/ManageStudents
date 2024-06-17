/// <reference types="cypress" />

describe('NewStudent Component', () => {


    it('should render input fields and button', () => {
        cy.visit('http://localhost:8081/');
        cy.wait(2000);
        cy.get('input[placeholder="Vorname"]').should('exist');
        cy.wait(2000);
        cy.get('input[placeholder="Nachname"]').should('exist');
        cy.wait(2000);
        cy.get('input[placeholder="Klasse"]').should('exist');
        cy.wait(2000);
        cy.contains('Fahrterleichterung?').should('exist');
        cy.wait(2000);
        cy.contains('Ja').should('exist');
        cy.wait(2000);
        cy.contains('Nein').should('exist');
        cy.wait(2000);
        cy.contains('Add Student').should('exist');
    });

    it('should allow entering student information', () => {
        cy.visit('http://localhost:8081/');
        cy.wait(2000);
        cy.get('input[placeholder="Vorname"]').type('Selina');
        cy.wait(2000);
        cy.get('input[placeholder="Nachname"]').type('Edelsbrunner');
        cy.wait(2000);
        cy.get('input[placeholder="Klasse"]').type('10A');
        cy.wait(2000);

        cy.get('input[placeholder="Vorname"]').should('have.value', 'Selina');
        cy.get('input[placeholder="Nachname"]').should('have.value', 'Edelsbrunner');
        cy.get('input[placeholder="Klasse"]').should('have.value', '10A');
    });
    it('should render search input', () => {
        cy.visit('http://localhost:8081/');
        cy.wait(2000);
        cy.get('input[placeholder="Search by student name"]').should('exist');
        cy.wait(2000);
    });

});
