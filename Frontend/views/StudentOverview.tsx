import React from 'react';
import {SafeAreaView} from "react-native";
import StudentList from "./StudentList";

const StudentOverview = () => {
    return (
        <SafeAreaView>
            <StudentList/>
        </SafeAreaView>
    );
};

export default StudentOverview;