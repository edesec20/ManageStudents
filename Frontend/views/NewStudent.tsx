import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View, Button} from "react-native";
import {IStudent} from "../models/IStudent";
import {RadioButton} from "react-native-paper";
import axios from "axios";

interface NewStudentsprops {
    students: IStudent[]
    setStudents: (students:IStudent[]) => void
    selectStudent: (student:IStudent | null) => void
}
const NewStudent:React.FC<NewStudentsprops> = ({selectStudent, students, setStudents}) => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [klasse, setKlasse]= useState<string>('');
    const [fahrterleichterung, setFahrterleichterung] = useState<boolean>(true);
    const [checked, setChecked] = useState('first');

    const addStudent = () =>{
        const newStudent: IStudent = {
            vorname: firstname,
            nachname: lastname,
            klasse: klasse,
            fahrterleichterung: fahrterleichterung,
        };
        console.log("Fahrterleichterung: ", fahrterleichterung)
        axios.post('http://localhost:3333/student/new', newStudent
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        setStudents([...students, newStudent]);
        setFirstname('');
        setLastname('');
        setKlasse('');
        setFahrterleichterung(false);
        setChecked('first');
        console.log(newStudent)

        selectStudent(null);

    }

    return (
        <ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Vorname"
                    value={firstname}
                    onChangeText={setFirstname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nachname"
                    value={lastname}
                    onChangeText={setLastname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Klasse"
                    value={klasse}
                    onChangeText={setKlasse}
                />
                <View style={styles.radioContainer}>
                    <Text>Fahrterleichterung?</Text>
                    <View style={styles.radioGroup}>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('first');
                                    setFahrterleichterung(true);
                                }}
                            />
                            <Text>Ja</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('second');
                                    setFahrterleichterung(false);
                                }}
                            />
                            <Text>Nein</Text>
                        </View>
                    </View>
                </View>
                <Button title="Add Student" onPress={addStudent} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    inputContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    radioContainer: {
        marginVertical: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    container: {
        padding: 20,
    },
    detailContainer: {
        marginBottom: 10,
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
    },
    defaultContainer: {
        backgroundColor: '#f8f8f8',
    },
    greenContainer: {
        backgroundColor: 'green',
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

export default NewStudent;