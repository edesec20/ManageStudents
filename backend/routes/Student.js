"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Student_model_db_1 = require("../src/db/Student.model.db");
let router = express_1.default.Router();
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = req.body;
        const newStudent = new Student_model_db_1.Student(studentData);
        yield newStudent.save();
        res.status(201).send(newStudent);
    }
    catch (error) {
        console.error('Fehler beim Erstellen des Studenten:', error);
        res.status(500).send({ error: 'Fehler beim Erstellen des Studenten' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_model_db_1.Student.findById(req.params.id);
        if (student) {
            res.status(200).send(student);
        }
        else {
            res.status(404).send({ error: 'Student nicht gefunden' });
        }
    }
    catch (error) {
        console.error('Fehler beim Abrufen des Studenten:', error);
        res.status(500).send({ error: 'Fehler beim Abrufen des Studenten' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student_model_db_1.Student.find();
        res.status(200).send(students);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Studenten:', error);
        res.status(500).send({ error: 'Fehler beim Abrufen der Studenten' });
    }
}));
module.exports = router;
