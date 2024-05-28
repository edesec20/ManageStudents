import React from 'react';
import {SafeAreaView, ScrollView} from "react-native";
import StudentList from "./StudentList";
import {IStudent} from "../models/IStudent";

interface StudentOverviewProps{
    students:IStudent[],
    setStudents: (students:IStudent[])=> void;
    selectedStudent: IStudent,
    setSelectedStudent: (student:IStudent) => void;
    selectStudent: (student:IStudent | null) => void;
}
const StudentOverview:React.FC<StudentOverviewProps> = ({students, setStudents, setSelectedStudent, selectStudent, selectedStudent}) => {
    return (
        <ScrollView>
            <StudentList students={students} setStudents={setStudents} selectStudent={selectStudent} setSelectedStudent={setSelectedStudent} selectedStudent={selectedStudent}/>
        </ScrollView>
    );
};

export default StudentOverview;