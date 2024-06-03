import {Student} from "./Student.model.db";
import Students from "../mock/mockdata";
import {Attendance} from "./Attendance.model.db";
import Attendances from "../mock/AttMock";

export const loadMockData = async () => {
    try {
        await Student.deleteMany({});
        await Attendance.deleteMany({});

        const insertedStudents =  await Student.insertMany(Students);

        const attendances = Attendances.map((attendance, index) => ({
            student: insertedStudents[index]._id,
            von: new Date(attendance.von),
            bis: new Date(attendance.bis)
        }));

        await Attendance.insertMany(attendances);
        console.log('Mockdaten geladen');
    } catch (error) {
        console.error('Fehler beim Laden der Mockdaten', error);
    }
}