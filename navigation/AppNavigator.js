import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import VoiceRecordScreen from '../screens/VoiceRecordScreen';
import SnapShotScreen from '../screens/SnapShotScreen';
import NurseryRhymesScreen from '../screens/NurseryRhymesScreen';
import HowToPlayScreen from '../screens/HowToPlayScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Learn" component={LearnScreen} />
            <Stack.Screen name="Recording" component={VoiceRecordScreen} />
            <Stack.Screen name="Snapshot" component={SnapShotScreen} />
            <Stack.Screen name="Nursery Rhymes" component={NurseryRhymesScreen} />
            <Stack.Screen name="How To Play" component={HowToPlayScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;
