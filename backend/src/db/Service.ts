import {Student} from "./Student.model.db";
import Students from "../mock/mockdata";

export const loadMockData = async () => {
    try {
        await Student.deleteMany({}); // Löscht alle bestehenden Daten in der Student-Kollektion
        await Student.insertMany(Students); // Fügt die Mockdaten hinzu
        console.log('Mockdaten geladen');
    } catch (error) {
        console.error('Fehler beim Laden der Mockdaten', error);
    }
}