describe('Student API', () => {
    const baseUrl = 'http://localhost:3333/student';
    const newStudent = {
        vorname: 'Max',
        nachname: 'Mustermann',
        fahrterleichterung: true,
        klasse: '10A'
    };

    let studentId: string;

    it('should create a new student', () => {
        cy.request('POST', `${baseUrl}/new`, newStudent).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('vorname', newStudent.vorname);
            studentId = response.body._id; // Speichere die ID des neuen Studenten für die folgenden Tests
        });
    });

    it('should get a student by id', () => {
        cy.request('GET', `${baseUrl}/${studentId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('vorname', newStudent.vorname);
        });
    });

    it('should get all students', () => {
        cy.request('GET', baseUrl).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });
});
