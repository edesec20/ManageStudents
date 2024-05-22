import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View, Button} from "react-native";
import {IStudent} from "../models/IStudent";

interface NewStudentsprops {
    students: IStudent[]
    setStudents: (students:IStudent[]) => void
    selectStudent: (student:IStudent | null) => void
}
const NewStudent:React.FC<NewStudentsprops> = ({selectStudent, students, setStudents}) => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [klasse, setKlasse]= useState<string>('');
    const [fahrterleichterung, setFahrterleichterung] = useState<boolean>(false);


    const addStudent = () =>{
        const newStudent: IStudent = {
            vorname: firstname,
            nachname: lastname,
            klasse: klasse,
            fahrerleichterung: fahrterleichterung,
        };
        setStudents([...students, newStudent]);
        setFirstname('');
        setLastname('');
        setKlasse('');
        setFahrterleichterung(false);

        selectStudent(null)
    }
    return (
            <View>
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
                    <Button title="Add Student" onPress={addStudent} />
                </View>
            </View>
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