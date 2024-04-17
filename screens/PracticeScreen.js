import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function PracticeScreen() {
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    async function startRecording() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        loadSound(uri);
    }

    async function loadSound(uri) {
        const { sound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: false }
        );
        setSound(sound);
    }

    async function playSound() {
        if (sound) {
            await sound.setStatusAsync({ shouldPlay: true, isLooping: true });
        }
    }

    async function stopPlayback() {
        if (sound) {
            await sound.stopAsync();
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Practice Your Pronunciation!</Text>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
                disabled={!hasPermission}
            />
            <Button
                title="Play Recording"
                onPress={playSound}
                disabled={!sound}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        marginBottom: 20,
    }
});
