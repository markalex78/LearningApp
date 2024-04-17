import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import LottieView from 'lottie-react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My Learning App!</Text>
            <LottieView
                source={require('../assets/animations/welcome-animation.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <Button
                title="Learn With Photos"
                onPress={() => navigation.navigate('Learn')}
            />
            <Button
                title="Practice Words"
                onPress={() => navigation.navigate('Practice')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffde59', // A bright yellow background
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', // White color for text
        marginBottom: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Text shadow for depth
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    button: {
        backgroundColor: '#ff785a', // A playful orange color for buttons
        borderRadius: 20, // Rounded corners for buttons
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#ff785a', // Matching shadow color
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,
        marginVertical: 10, // Space between buttons
    },
    buttonText: {
        color: '#ffffff', // White color for button text
        fontSize: 18,
        fontWeight: 'bold',
    },
    animation: {
        width: 300,
        height: 300,
        marginBottom: 30,
    }
});
