import React from 'react';
import {IStudent} from "../models/IStudent";
import {StyleSheet, ScrollView, Text, TouchableOpacity, TouchableOpacityComponent, View} from "react-native";


interface StudentDetailsProps{
    student:IStudent
    selectStudent: (student:IStudent | null) => void
}
const StudentDetails:React.FC<StudentDetailsProps> = ({student, selectStudent}) => {

    const handlePress = () => {
        selectStudent(student)
        console.log(student)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.nameText}>{student.vorname} {student.nachname}</Text>
                </View>


            </ScrollView>
        </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
});

export default StudentDetails;