import React from 'react';
import {IStudent} from "../models/IStudent";
import StudentList from "./StudentList";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import StudentDetails from "./StudentDetails";
import StudentDetailsSwipe from "./StudentDetailsSwipe";

interface StudentStatusProps{
    students:IStudent[],
    setStudents: (students:IStudent[]) => void;
    selectedStudent:IStudent,
    setSelectedStudent: (student:IStudent) => void;
    selectStudent : (student:IStudent | null) => void;
}
const StudentStatus:React.FC<StudentStatusProps> = ({students,setStudents, selectedStudent, setSelectedStudent, selectStudent}) => {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.card}>
                <Text style={styles.header}>Students</Text>
            </View>


            {students? students.map((s) => (
                <StudentDetailsSwipe student={s} selectStudent={selectStudent}/>
            )) : ""}
        </ScrollView>
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

export default StudentStatus;