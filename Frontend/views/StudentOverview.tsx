import React from 'react';
import {SafeAreaView} from "react-native";
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
        <SafeAreaView>
            <StudentList students={students} setStudents={setStudents} selectStudent={selectStudent} setSelectedStudent={setSelectedStudent} selectedStudent={selectedStudent}/>
        </SafeAreaView>
    );
};

export default StudentOverview;