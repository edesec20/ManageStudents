import express, { Request, Response } from "express";
import { Attendance } from "../src/db/Attendance.model.db";
import { IAttendance } from "../src/model/IAttendance";
import { Student } from "../src/db/Student.model.db";

let router = express.Router();

router.post('/new/:id', async (req: Request, res: Response) => {
    try {
        const attendanceData: IAttendance = req.body as IAttendance;
        const studentId = req.params.id;
        // Prüfen, ob der Student existiert
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send({ error: 'Student nicht gefunden' });
        }

        const newAttendance = new Attendance({
            student:attendanceData.student,
            von:attendanceData.von,
            bis:attendanceData.bis
        });
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
        const endTime = req.body.bis;

        // Finde den Schüler
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send({ error: 'Schüler nicht gefunden' });
        }

        // Finde die letzte Anwesenheit des Schülers und setze die Endzeit
        const lastAttendance = await Attendance.findOne({ student: studentId, bis: null });
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


router.get('/totalHours/:id', async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;

        // Berechne die Start- und Endzeit für die letzten 7 Tage
        const endTime = new Date();
        const startTime = new Date();
        startTime.setDate(endTime.getDate() - 7);

        // Finde alle Anwesenheiten für den angegebenen Schüler im Zeitraum der letzten 7 Tage
        const attendances = await Attendance.find({
            student: studentId,
            von: { $gte: startTime },
            bis: { $lte: endTime }
        });


        if (attendances.length === 0) {
            return res.status(404).send({ error: 'Keine Anwesenheiten in den letzten 7 Tagen gefunden' });
        }

        // Berechne die gesamte Stundenanzahl, die der Schüler anwesend war
        let totalHours = 0;
        attendances.forEach(attendance => {
            const von = attendance.von ? new Date(attendance.von).getTime() : Date.now();
            const bis = attendance.bis ? new Date(attendance.bis).getTime() : Date.now(); // Falls 'bis' null ist, wird die aktuelle Zeit verwendet
            totalHours += (bis - von) / (1000 * 60 * 60); // Millisekunden zu Stunden
            console.log(totalHours);
        });

        res.status(200).send({ totalHours: totalHours });
    } catch (error) {
        console.error('Fehler beim Abrufen der Anwesenheiten:', error);
        res.status(500).send({ error: 'Fehler beim Abrufen der Anwesenheiten' });
    }
});



module.exports = router;
