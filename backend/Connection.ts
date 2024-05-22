import mongoose from 'mongoose'

const DB_URL = 'mongodb://localhost:27017/ManageStudent'

export const connectDB = async () => {
    try {
        const uri = 'mongodb://127.0.0.1:27017/ManageStudent'; // Setze hier deinen MongoDB-Verbindungsstring ein
        await mongoose.connect(uri);
        console.log('Datenbank verbunden');
    } catch (error) {
        console.error('Datenbankverbindung fehlgeschlagen', error);
        process.exit(1); // Beendet die Anwendung bei einer fehlgeschlagenen Verbindung
    }
}