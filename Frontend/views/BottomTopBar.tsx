import React, {useState} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StudentOverview from "./StudentOverview";
import StudentStatus from "./StudentStatus";
import NewStudent from "./NewStudent";
import {IStudent} from "../models/IStudent";

const BottomTopBar = () => {
    const Tab = createBottomTabNavigator();
    const [students, setStudents] = useState<IStudent[]>(require("../mockdaten/students_mock_data.json"));
    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);

    const selectStudent = (student:IStudent | null) => {
        setSelectedStudent(student);
    }
    return (
        <Tab.Navigator>
            <Tab.Screen name={"StudentOverview"}>
                {() => <StudentOverview students={students} setStudents={setStudents} selectStudent={selectStudent} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent}/>}
            </Tab.Screen>
            <Tab.Screen name={"NewStudent"}>
                {() => <NewStudent students={students} setStudents={setStudents} selectStudent={selectStudent} />}
            </Tab.Screen>


        </Tab.Navigator>
    );
};

export default BottomTopBar;