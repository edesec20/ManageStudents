import React, {useState} from 'react';
import {IStudent} from "../models/IStudent";
import {StyleSheet, ScrollView, Text, TouchableOpacity, TouchableOpacityComponent, View} from "react-native";
import {RectButton, Swipeable} from "react-native-gesture-handler";



interface StudentDetailsProps{
    student:IStudent
    selectStudent: (student:IStudent | null) => void
}
const StudentDetails:React.FC<StudentDetailsProps> = ({student, selectStudent}) => {
    const [swipedLeft, setSwipedLeft] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    const onSwipeLeft = () => {
        setBackgroundColor('red')
        console.log("swiped left")
    };

    const onSwipeRight = () => {
        setBackgroundColor('green');
    };

    const renderRightActions = () => {
        return (
            <RectButton style={styles.deleteButton}>
                <Text>Abwesend</Text>
            </RectButton>
        );
    };

    const renderLeftActions = () => {
        return (
            <RectButton style={styles.greenButton}>
                <Text>Anwesend</Text>
            </RectButton>
        );
    };

    const renderBackground = () => {
        // Hintergrundfarbe basierend auf dem Swipe-Status
        return {
            backgroundColor: backgroundColor,
        };
    };


    return (

        <Swipeable
        renderRightActions={renderLeftActions}
        renderLeftActions={renderRightActions}
        onSwipeableLeftOpen={onSwipeLeft}
        onSwipeableRightOpen={onSwipeRight}
        >
            <TouchableOpacity style={[styles.container, renderBackground()]}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.card}>
                        <Text style={styles.nameText}>{student.vorname} {student.nachname}</Text>
                    </View>
                </ScrollView>
            </TouchableOpacity>
        </Swipeable>

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
    greenButton: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
    },
    greenText: {
        color: 'white',
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
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
    },
    deleteText: {
        color: 'white',
    },
});

export default StudentDetails;