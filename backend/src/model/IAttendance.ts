import {IStudent} from "./IStudent";

export interface IAttendance{
    student:IStudent,
    von:Date,
    bis:Date
}