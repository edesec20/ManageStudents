import React from 'react';
import {IStudent} from "../models/IStudent";
import {StyleSheet, Button, ScrollView, Text, TouchableOpacity, View} from "react-native";


interface SingleStudentDetailProps{
    selectedStudent:IStudent,
    selectStudent: (student:IStudent | null) => void,
}
const SingleStudentDetail:React.FC<SingleStudentDetailProps> = ({selectedStudent, selectStudent}) => {
    const containerStyle = selectedStudent.fahrerleichterung ? styles.greenContainer : styles.defaultContainer;
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.backButton} onPress={() => selectStudent(null)}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.detailContainer, containerStyle]}>
                    <Text style={styles.name}>{selectedStudent.vorname} {selectedStudent.nachname}</Text>
                    <Text style={styles.text}>{selectedStudent.klasse}</Text>
                    <Text style={styles.text}>{selectedStudent.fahrerleichterung ? "Fahrterleichterung vorhanden" : "keine Fahrterleichterung vorhanden"}</Text>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    backButton: {
        padding: 10,
        margin: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultContainer: {
        backgroundColor: '#f8f8f8',
    },
    greenContainer: {
        backgroundColor: 'green',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        padding: 20,
    },
    detailContainer: {
        marginBottom: 10,
        alignItems: 'center'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: '#555',
    },
});

export default SingleStudentDetail;