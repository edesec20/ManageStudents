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
exports.loadMockData = void 0;
const Student_model_db_1 = require("./Student.model.db");
const mockdata_1 = __importDefault(require("../mock/mockdata"));
const Attendance_model_db_1 = require("./Attendance.model.db");
const AttMock_1 = __importDefault(require("../mock/AttMock"));
const loadMockData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Student_model_db_1.Student.deleteMany({});
        yield Attendance_model_db_1.Attendance.deleteMany({});
        const insertedStudents = yield Student_model_db_1.Student.insertMany(mockdata_1.default);
        const attendances = AttMock_1.default.map((attendance, index) => ({
            student: insertedStudents[index]._id,
            von: new Date(attendance.von),
            bis: new Date(attendance.bis)
        }));
        yield Attendance_model_db_1.Attendance.insertMany(attendances);
        console.log('Mockdaten geladen');
    }
    catch (error) {
        console.error('Fehler beim Laden der Mockdaten', error);
    }
});
exports.loadMockData = loadMockData;
