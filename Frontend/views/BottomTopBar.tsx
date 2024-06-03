import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StudentOverview from "./StudentOverview";
import StudentStatus from "./StudentStatus";
import NewStudent from "./NewStudent";
import {IStudent} from "../models/IStudent";
import axios from "axios";

const BottomTopBar = () => {
    const Tab = createBottomTabNavigator();
    const [students, setStudents] = useState<IStudent[]>(null);
    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);

    const selectStudent = (student:IStudent | null) => {
        setSelectedStudent(student);
    }

    useEffect(() => {
        console.log("in useeffect")
        axios.get('http://localhost:3333/student/')
            .then(response => {
                setStudents(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, []);
    return (


        <Tab.Navigator>
            <Tab.Screen name={"StudentStatus"}>
                {() => <StudentStatus students={students} setStudents={setStudents} selectStudent={selectStudent} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent}/>}
            </Tab.Screen>
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