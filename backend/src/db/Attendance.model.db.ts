import mongoose, {Schema} from "mongoose";
import {IStudent} from "../model/IStudent";

const AttendanceSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    von: { type: Date, required: true },
    bis: { type: Date, required: true }
});

const AttendanceModelDb = mongoose.model('Attendance', AttendanceSchema);

export const Attendance = AttendanceModelDb;


