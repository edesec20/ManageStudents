import mongoose, {Schema} from "mongoose";
import {IStudent} from "../model/IStudent";

const AttendanceSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: false },
    von: { type: Date, required: false },
    bis: { type: Date, required: false }
});

const AttendanceModelDb = mongoose.model('Attendance', AttendanceSchema);

export const Attendance = AttendanceModelDb;


