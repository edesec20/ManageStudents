import mongoose, {Schema} from "mongoose";

const StudentSchema = new Schema({
    vorname: { type: String, required: false },
    nachname: {type:String, required:false},
    fahrterleichterung: {type:Boolean, required:false},
    klasse:{type:String, required:false}
});

const StudentModelDb = mongoose.model('Student', StudentSchema);

export const Student = StudentModelDb;


