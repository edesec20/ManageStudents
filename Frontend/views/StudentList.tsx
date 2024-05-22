import React, {useState} from 'react';
import {IStudent} from "../models/IStudent";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import StudentDetails from "./StudentDetails";
import SingleStudentDetail from "./SingleStudentDetail";
import NewStudent from "./NewStudent";

const StudentList = () => {
    const [students, setStudents] = useState<IStudent[]>(require("../mockdaten/students_mock_data.json"));
    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);


    const selectStudent = (student:IStudent | null) => {
        setSelectedStudent(student);
    }

    return selectedStudent?(

        // Wie kann ich die Students über mehrere Pages hinweg weitergeben (StudentStatus & NewStudent!)

        <ScrollView>
            <SingleStudentDetail selectedStudent={selectedStudent} selectStudent={selectStudent}/>
        </ScrollView>

        ):(

        <SafeAreaView style={styles.scrollView}>
            <View style={styles.card}>
                <Text style={styles.header}>Students</Text>
            </View>


            {students.map((s) => (
                <StudentDetails student={s} selectStudent={selectStudent}/>
            ))}

            <NewStudent students={students} setStudents={setStudents} selectStudent={selectStudent}/>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f8f9fa',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    scrollView: {
        padding: 15,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    detailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    header: {
        fontSize: 38,
        fontFamily: 'CHILD_STATE',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
});

export default StudentList;