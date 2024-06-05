describe('Attendance API', () => {
    const baseUrl = 'http://localhost:3333/attendance';
    const student = {
        vorname: 'Maxl',
        nachname: 'MAXIII',
        fahrterleichterung: true,
        klasse: '4CHIF'
    };

    let studentId: string;
    let attendanceId: string;

    before(() => {
        cy.request('POST', 'http://localhost:3333/student/new', student).then((response) => {
            expect(response.status).to.eq(201);
            studentId = response.body._id;
        });
    });

    it('should create a new attendance', () => {
        cy.request('POST', `${baseUrl}/new/${studentId}`, {
            student: studentId,
            von: new Date().toISOString(),
            bis: null
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('student', studentId);
            attendanceId = response.body._id;
        });
    });

    it('should set end time for the last attendance record', () => {
        cy.request('POST', `${baseUrl}/setEndTime/${studentId}`, {
            bis: new Date().toISOString()
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('bis');
        });
    });

    it('should get all attendance records for a student', () => {
        cy.request('GET', `${baseUrl}/${studentId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should get all attendance records', () => {
        cy.request('GET', baseUrl).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should get total hours of attendance for the last 7 days', () => {
        cy.request('GET', `${baseUrl}/totalHours/${studentId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('totalHours');
        });
    });
});
