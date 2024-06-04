import React, {useState} from 'react';
import {SafeAreaView, ScrollView, TextInput, View, StyleSheet, Text} from "react-native";
import StudentList from "./StudentList";
import {IStudent} from "../models/IStudent";

interface StudentOverviewProps{
    students: IStudent[],
    setStudents: (students: IStudent[]) => void;
    selectedStudent: IStudent,
    setSelectedStudent: (student: IStudent) => void;
    selectStudent: (student: IStudent | null) => void;
}

const StudentOverview:React.FC<StudentOverviewProps> = ({students, setStudents, setSelectedStudent, selectStudent, selectedStudent}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [fahrterleichterungFilter, setFahrterleichterungFilter] = useState<'yes' | 'no' | null>(null);

    const filteredStudents = students.filter(student =>
        (student.vorname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.nachname.toLowerCase().includes(searchQuery.toLowerCase()))

    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by student name"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#888"
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <StudentList
                    students={filteredStudents}
                    setStudents={setStudents}
                    selectStudent={selectStudent}
                    setSelectedStudent={setSelectedStudent}
                    selectedStudent={selectedStudent}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    scrollViewContent: {
        paddingBottom: 10,
    },
});

export default StudentOverview;
