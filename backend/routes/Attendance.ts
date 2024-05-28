import express, { Request, Response } from "express";
import { Attendance } from "../src/db/Attendance.model.db";
import { IAttendance } from "../src/model/IAttendance";
import { Student } from "../src/db/Student.model.db";

let router = express.Router();

router.post('/new', async (req: Request, res: Response) => {
    try {
        const attendanceData: IAttendance = req.body;

        // Prüfen, ob der Student existiert
        const student = await Student.findById(attendanceData.student);
        if (!student) {
            return res.status(404).send({ error: 'Student nicht gefunden' });
        }

        const newAttendance = new Attendance(attendanceData);
        await newAttendance.save();
        res.status(201).send(newAttendance);
    } catch (error) {
        console.error('Fehler beim Erstellen der Anwesenheit:', error);
        res.status(500).send({ error: 'Fehler beim Erstellen der Anwesenheit' });
    }
});


router.post('/setEndTime/:id', async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;
        const endTime = req.body.endTime;

        // Finde den Schüler
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send({ error: 'Schüler nicht gefunden' });
        }

        // Finde die letzte Anwesenheit des Schülers und setze die Endzeit
        const lastAttendance = await Attendance.findOne({ student: studentId }).sort({ bis: -1 });
        if (!lastAttendance) {
            return res.status(404).send({ error: 'Keine Anwesenheiten für diesen Schüler gefunden' });
        }

        lastAttendance.bis = endTime;
        await lastAttendance.save();

        res.status(200).send(lastAttendance);
    } catch (error) {
        console.error('Fehler beim Setzen der Endzeit der Anwesenheit:', error);
        res.status(500).send({ error: 'Fehler beim Setzen der Endzeit der Anwesenheit' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;

        // Finde alle Anwesenheiten für den angegebenen Schüler
        const attendances = await Attendance.find({ student: studentId }).populate('student');

        if (attendances.length > 0) {
            res.status(200).send(attendances);
        } else {
            res.status(404).send({ error: 'Keine Anwesenheiten für diesen Schüler gefunden' });
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Anwesenheiten:', error);
        res.status(500).send({ error: 'Fehler beim Abrufen der Anwesenheiten' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const attendances = await Attendance.find().populate('student');
        res.status(200).send(attendances);
    } catch (error) {
        console.error('Fehler beim Abrufen der Anwesenheiten:', error);
        res.status(500).send({ error: 'Fehler beim Abrufen der Anwesenheiten' });
    }
});

module.exports = router;
