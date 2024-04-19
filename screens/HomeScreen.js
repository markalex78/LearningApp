import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Welcome to My Learning App!</Text>
            <LottieView
                source={require('../assets/animations/welcome-animation.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <View style={[styles.buttonRow, styles.topButtonRow]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                    onPress={() => navigation.navigate('Learn')}>
                    <Text style={styles.buttonText}>Learn With Photos</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                    onPress={() => navigation.navigate('Recording')}>
                    <Text style={styles.buttonText}>Practice Words</Text>
                </Pressable>
            </View>
            <View style={[styles.buttonRow, styles.bottomButtonRow]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                    onPress={() => navigation.navigate('Snapshot')}>
                    <Text style={styles.buttonText}>Snap and Name</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                    onPress={() => navigation.navigate('Nursery Rhymes')}>
                    <Text style={styles.buttonText}>Sing Along</Text>
                </Pressable>
            </View>
            {/* How to Play Button */}
            <Pressable
                style={({ pressed }) => [
                    styles.howToPlayButton,
                    { opacity: pressed ? 0.5 : 1 }
                ]}
                onPress={() => navigation.navigate('How To Play')}>
                <Text style={styles.buttonText}>How to Play</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffde59', // Adjust the background color as needed
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center', // This ensures the container's children are centered
        padding: 20, // Padding around the scroll view content
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 0, // Space below the title
        marginTop: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', // Full width to accommodate space-around
        marginBottom: 20, // Space between the rows of buttons
    },
    topButtonRow: {
        marginBottom: 10, // Space below the top row of buttons
    },
    bottomButtonRow: {
        marginTop: 0, // Minimal space above the bottom row of buttons
    },
    button: {
        backgroundColor: '#ff785a',
        borderRadius: 20,
        padding: 15, // Padding within each button
        flex: 1, // Flex each button to fill available space
        marginHorizontal: 10, // Horizontal space between buttons
        alignItems: 'center', // Center align text horizontally
        justifyContent: 'center', // Center align text vertically
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    animation: {
        width: 300,
        height: 300,
        marginBottom: 30, // Space below the animation
    },
    howToPlayButton: {
        backgroundColor: '#ADD8E6',  // Light blue color
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: '80%',  // Width is 80% of the container
        marginVertical: 10,  // Space from other elements
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',  // This centers the button in the ScrollView
    }
});

