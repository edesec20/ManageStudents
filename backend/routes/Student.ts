import express, { Request, Response} from "express";
import {Student} from "../src/db/Student.model.db";
import {IStudent} from "../src/model/IStudent";



let router = express.Router();

router.post('/new', async (req: Request, res: Response) => {
    try {
        const studentData: IStudent = req.body;
        const newStudent = new Student(studentData);
        await newStudent.save();
        console.log(newStudent+"ksjdhfkjshdfsf");
        res.status(201).send(newStudent);
    } catch (error) {
        console.error('Fehler beim Erstellen des Studenten:', error);
        res.status(500).send({ error: 'Fehler beim Erstellen des Studenten' });
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.status(200).send(student);
        } else {
            res.status(404).send({ error: 'Student nicht gefunden' });
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Studenten:', error);
        res.status(500).send({ error: 'Fehler beim Abrufen des Studenten' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const students = await Student.find();
        res.status(200).send(students);
    } catch (error) {
        console.error('Fehler beim Abrufen der Studenten:', error);
        res.status(500).send({ error: 'Fehler beim Abrufen der Studenten' });
    }
});

module.exports = router;
