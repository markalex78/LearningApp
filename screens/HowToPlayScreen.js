import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HowToPlayScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Welcome to My Educational Game!</Text>
            <Text style={styles.subHeader}>Getting Started</Text>
            <Text style={styles.text}>
                1. Home Screen: Start your journey on the Home Screen where you can choose from several activities. Tap on any of the buttons to navigate to different sections of the game:
                - Learn With Photos: Enhance your knowledge with interactive photo cards.
                - Practice Words: Record your voice and practice pronunciation.
                - Snap and Name: Take photos and label them to improve your vocabulary.
                - Sing Along: Enjoy singing along with classic nursery rhymes.
            </Text>
            <Text style={styles.text}>
                2. Navigation: Use the back arrow on the top of the screen to return to the Home Screen at any time.
            </Text>
            <Text style={styles.subHeader}>Learn With Photos</Text>
            <Text style={styles.text}>
                - Interaction: Tap on a card to flip it and hear the word pronounced.
                - You will hear the word every 3 seconds if not flipped back or another card is flipped.
                - Tap the card again to flip it back to the image.
            </Text>
            <Text style={styles.subHeader}>Practice Words</Text>
            <Text style={styles.text}>
                - Recording: Tap the microphone icon to start recording your voice. Tap again to stop.
                - Playback: Plays back recording automatically. Listen to your recording to check and improve your pronunciation.
                - Image: Tap on the image to change to new image.
            </Text>
            <Text style={styles.subHeader}>Snap and Name</Text>
            <Text style={styles.text}>
                - Taking Photos: Grant camera permissions to take photos. Tap the camera icon to capture images.
                - Naming Photos: After taking a photo, type in the name of the object or scene captured to practice spelling and vocabulary.
            </Text>
            <Text style={styles.subHeader}>Sing Along</Text>
            <Text style={styles.text}>
                - Play Music: Select a nursery rhyme to play it. You can stop as needed.
                - Download: Songs are downloaded for offline access whenever you play them for the first time
                - Give it time to download when clicked for the first time.
            </Text>
            <Text style={styles.text}>
                If you ever need a reminder of the game rules or how to interact with the game, return to this 'How to Play' section accessible from the Home Screen.
            </Text>
            <Text style={styles.footer}>
                I hope you enjoy learning with my app!
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    footer: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    // Add more styles here as needed
});

export default HowToPlayScreen;