import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import PracticeScreen from '../screens/PracticeScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Learn" component={LearnScreen} />
            <Stack.Screen name="Practice" component={PracticeScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;
