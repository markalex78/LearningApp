import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const nurseryRhymes = [
    { title: "London Bridge Is Falling Down", url: "https://singwithourkids.com/songs/london-bridge-is-falling-down.mp3" },
    { title: "It's Raining It's Pouring", url: "https://singwithourkids.com/songs/its-raining-its-pouring.mp3" },
    { title: "Little Miss Muffet", url: "https://singwithourkids.com/songs/little-miss-muffet.mp3" },
    { title: "Mary Had A Little Lamb", url: "https://singwithourkids.com/songs/mary-had-a-little-lamb.mp3" },
    { title: "My Bonnie Lies Over The Ocean", url: "https://singwithourkids.com/songs/my-bonnie.mp3" },
    { title: "Old Macdonald", url: "https://singwithourkids.com/songs/old-mcadonald.mp3" },
    { title: "Pop Goes The Weasel", url: "https://singwithourkids.com/songs/pop-goes-the-weasel.mp3" },
    { title: "She'll Be Coming 'Round The Mountain", url: "https://singwithourkids.com/songs/shell-be-comin-rouind-the-mountain.mp3" },
    { title: "Alphabet Song", url: "https://singwithourkids.com/songs/alphabet%20song.mp3" },
    { title: "A Hunting We Will Go", url: "https://singwithourkids.com/songs/A%20Hunting%20We%20Will%20Go.mp3" },
    { title: "Baa, Baa, Black Sheep", url: "https://singwithourkids.com/songs/baa-baa-black-sheep.mp3" },
    { title: "Five Little Ducks", url: "https://singwithourkids.com/songs/five-little-ducks.mp3" },
];

export default function NurseryRhymesScreen() {
    const [sound, setSound] = useState(null);
    const [playing, setPlaying] = useState(null);

    const getLocalUri = (title) => {
        return `${FileSystem.documentDirectory}${title.replace(/ /g, '_')}.mp3`;
    };

    const playSound = async (url, id) => {
        const localUri = getLocalUri(nurseryRhymes[id].title);

        // Check if file exists locally
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        if (fileInfo.exists) {
            console.log("Playing from local storage.");
            loadAndPlaySound(localUri, id);
        } else {
            // Download file if not found locally
            console.log("Downloading file to local storage.");
            const download = await FileSystem.downloadAsync(url, localUri);
            if (download.status === 200) {
                loadAndPlaySound(localUri, id);
            } else {
                console.error("Failed to download the file");
            }
        }
    };

    const loadAndPlaySound = async (uri, id) => {
        if (sound) {
            await sound.unloadAsync();
        }
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );
            setSound(newSound);
            setPlaying(id);
        } catch (error) {
            console.error("Failed to load the sound", error);
        }
    };

    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
            setPlaying(null);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {nurseryRhymes.map((rhyme, index) => (
                <View key={index} style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => playSound(rhyme.url, index)}>
                        <Text style={styles.text}>{rhyme.title}</Text>
                    </TouchableOpacity>
                    {playing === index && (
                        <TouchableOpacity style={styles.button} onPress={stopSound}>
                            <MaterialIcons name="stop" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34ace0',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#ff9f1a',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
