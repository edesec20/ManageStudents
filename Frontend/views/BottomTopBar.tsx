import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StudentOverview from "./StudentOverview";
import StudentStatus from "./StudentStatus";
import NewStudent from "./NewStudent";

const BottomTopBar = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name={"StudentStatus"} component={StudentStatus}/>
            <Tab.Screen name={"StudentOverview"} component={StudentOverview}/>
            {/*<Tab.Screen name={"NewStudent"} component={NewStudent}/>*/}

        </Tab.Navigator>
    );
};

export default BottomTopBar;