import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';

const MAX_IMAGES = 5;

export default function SnapShotScreen() {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [images, setImages] = useState([]);
    const [imageNames, setImageNames] = useState([]);

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        setPermissionsGranted(status === 'granted');
        console.log('Camera Permission Status:', status);
    };

    const takePicture = async () => {
        if (!permissionsGranted) {
            Alert.alert('Permissions not granted', 'You need to allow camera access in settings.');
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            console.log('Image Picker Result:', result);

            if (!result.cancelled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri; // Correctly accessing the URI from the first asset
                handleImageSave(uri);
            } else {
                console.error('No image captured or URI not provided.');
            }
        } catch (error) {
            console.error('Error launching camera:', error);
        }
    };

    const handleImageSave = async (uri) => {
        try {
            const filename = FileSystem.documentDirectory + `${Date.now()}.jpg`;
            await FileSystem.moveAsync({
                from: uri,
                to: filename,
            });
            setImages(prevImages => [filename, ...prevImages.slice(0, MAX_IMAGES - 1)]);
            setImageNames(prevNames => ['', ...prevNames.slice(0, MAX_IMAGES - 1)]);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const handleNameChange = (text, index) => {
        const updatedNames = [...imageNames];
        updatedNames[index] = text;
        setImageNames(updatedNames);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>Take A Photo</Text>
            <TouchableOpacity onPress={takePicture} style={styles.button}>
                <MaterialIcons name="camera-alt" size={34} color="white" />
            </TouchableOpacity>
            {images.map((uri, index) => (
                <View key={uri} style={styles.imageContainer}>
                    <Image source={{ uri }} style={styles.image} />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => handleNameChange(text, index)}
                        value={imageNames[index]}
                        placeholder="Enter Image Name"
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34ace0',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#ff9f1a',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    image: {
        width: 250,
        height: 250,
    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
});
