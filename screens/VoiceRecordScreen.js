import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const images = [
    { image: require('../assets/images/dog.jpg'), name: 'Dog' },
    { image: require('../assets/images/cat.jpg'), name: 'Cat' },
    { image: require('../assets/images/sun.jpg'), name: 'Sun' },
    { image: require('../assets/images/baby.jpg'), name: 'Baby' },
    { image: require('../assets/images/girl.jpg'), name: 'Girl' },
    { image: require('../assets/images/boy.jpg'), name: 'Boy' },
    { image: require('../assets/images/fish.jpg'), name: 'Fish' },
    { image: require('../assets/images/lion.jpg'), name: 'Lion' },
    { image: require('../assets/images/keys.jpg'), name: 'Keys' },
    { image: require('../assets/images/car.jpg'), name: 'Car' },
    { image: require('../assets/images/bus.jpg'), name: 'Bus' },
    { image: require('../assets/images/train.jpg'), name: 'Train' },
    { image: require('../assets/images/house.jpg'), name: 'House' },
    { image: require('../assets/images/rainbow.jpg'), name: 'Rainbow' },
    { image: require('../assets/images/ball.jpg'), name: 'Ball' },
    { image: require('../assets/images/book.jpg'), name: 'Book' },
    { image: require('../assets/images/tree.jpg'), name: 'Tree' },
    { image: require('../assets/images/flower.jpg'), name: 'Flower' },
];

export default function VoiceRecordScreen() {
    // Set initial image index to a random number
    const [currentImageIndex, setCurrentImageIndex] = useState(Math.floor(Math.random() * images.length))
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState(null);
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            setHasMicrophonePermission(status === 'granted');
            setCurrentImageIndex(Math.floor(Math.random() * images.length));
        })();
    }, []);

    async function startRecording() {
        if (!hasMicrophonePermission) {
            console.error('Microphone permission is not granted');
            // Optionally, alert the user here.
            return;
        }
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            const { sound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );
            setSound(sound);
            setRecording(null);
        }
    }

    // Function to cycle to the next image
    const changeImage = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * images.length);
        } while (randomIndex === currentImageIndex); // Ensure it's a different image
        setCurrentImageIndex(randomIndex);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Record the name of the image</Text>
            <TouchableOpacity onPress={changeImage} style={styles.imageContainer}>
                <Image source={images[currentImageIndex].image} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.button}>
                {recording ? (
                    <MaterialIcons name="stop" size={34} color="white" />
                ) : (
                    <MaterialIcons name="mic" size={34} color="white" />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34ace0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff9f1a',
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        marginVertical: 10,
    },
    imageContainer: {
        width: 300,
        height: 300,
        marginBottom: 20, // Adjust as needed
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
