import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, FlatList } from 'react-native';
import { Audio } from 'expo-av';

// Example data array for 9 cards
const cardData = [
    {
        id: '1', image: require('../assets/images/dog.jpg'), description: 'Dog',
        soundUri: require('../assets/sounds/dog.mp3'),
    },
    {
        id: '2', image: require('../assets/images/cat.jpg'), description: 'Cat',
        soundUri: require('../assets/sounds/cat.mp3'),
    },
    {
        id: '3', image: require('../assets/images/sun.jpg'), description: 'Sun',
        soundUri: require('../assets/sounds/sun.mp3'),
    },
    {
        id: '4', image: require('../assets/images/baby.jpg'), description: 'Baby',
        soundUri: require('../assets/sounds/baby.mp3'),
    },
    {
        id: '5', image: require('../assets/images/girl.jpg'), description: 'Girl',
        soundUri: require('../assets/sounds/girl.mp3'),
    },
    {
        id: '6', image: require('../assets/images/boy.jpg'), description: 'Boy',
        soundUri: require('../assets/sounds/boy.mp3'),
    },
    {
        id: '7', image: require('../assets/images/fish.jpg'), description: 'Fish',
        soundUri: require('../assets/sounds/fish.mp3'),
    },
    {
        id: '8', image: require('../assets/images/lion.jpg'), description: 'Lion',
        soundUri: require('../assets/sounds/lion.mp3'),
    },
    {
        id: '9', image: require('../assets/images/keys.jpg'), description: 'Keys',
        soundUri: require('../assets/sounds/keys.mp3'),
    },
    {
        id: '10', image: require('../assets/images/car.jpg'), description: 'Car',
        soundUri: require('../assets/sounds/car.mp3'),
    },
    {
        id: '11', image: require('../assets/images/bus.jpg'), description: 'Bus',
        soundUri: require('../assets/sounds/bus.mp3'),
    },
    {
        id: '12', image: require('../assets/images/train.jpg'), description: 'Train',
        soundUri: require('../assets/sounds/train.mp3'),
    },
    {
        id: '13', image: require('../assets/images/house.jpg'), description: 'House',
        soundUri: require('../assets/sounds/house.mp3'),
    },
    {
        id: '14', image: require('../assets/images/rainbow.jpg'), description: 'Rainbow',
        soundUri: require('../assets/sounds/rainbow.mp3'),
    },
    {
        id: '15', image: require('../assets/images/ball.jpg'), description: 'Ball',
        soundUri: require('../assets/sounds/ball.mp3'),
    },
    {
        id: '16', image: require('../assets/images/book.jpg'), description: 'Book',
        soundUri: require('../assets/sounds/book.mp3'),
    },
    {
        id: '17', image: require('../assets/images/tree.jpg'), description: 'Tree',
        soundUri: require('../assets/sounds/tree.mp3'),
    },
    {
        id: '18', image: require('../assets/images/flower.jpg'), description: 'Flower',
        soundUri: require('../assets/sounds/flower.mp3'),
    },
];

export default function LearnScreen() {
    const flipAnimValues = useRef(cardData.reduce((acc, card) => {
        acc[card.id] = new Animated.Value(0); // 0 is the initial value for the front of the card
        return acc;
    }, {})).current;

    const [flippedCards, setFlippedCards] = useState(cardData.reduce((acc, card) => {
        acc[card.id] = false;
        return acc;
    }, {}));

    // State to keep track of sound objects
    const [sounds, setSounds] = useState({});

    // Function to handle playing sound with delay
    const playSoundWithDelay = async (sound, delay) => {
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
            if (playbackStatus.didJustFinish) {
                setTimeout(async () => {
                    await sound.setPositionAsync(0); // Rewind to start
                    await playSoundWithDelay(sound, delay); // Recursively play with delay
                }, delay);
            }
        });
    };

    // Function to flip a card and manage sound
    const flipCard = async (id) => {
        let isFlipped = flippedCards[id];
        let sound = sounds[id];

        // If the card is about to flip to the back, load and play the sound
        if (!isFlipped) {
            if (!sound) {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    cardData.find((card) => card.id === id).soundUri,
                    { shouldPlay: false }
                );
                setSounds({ ...sounds, [id]: newSound });
                await playSoundWithDelay(newSound, 3000); // 3000 ms delay
            }
        } else {
            // If the card flips back to the front, stop the sound
            if (sound) {
                sound.setOnPlaybackStatusUpdate(null);
                await sound.stopAsync();
                await sound.unloadAsync();
                setSounds({ ...sounds, [id]: null });
            }
        }

        // Start the flip animation
        Animated.spring(flipAnimValues[id], {
            toValue: isFlipped ? 0 : 180,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start();

        // Update the flipped state for the card
        setFlippedCards((prevState) => ({
            ...prevState,
            [id]: !isFlipped
        }));
    };

    const renderItem = ({ item }) => {
        const frontAnimatedStyle = {
            transform: [
                {
                    rotateY: flipAnimValues[item.id].interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '180deg']
                    })
                }
            ]
        };

        const backAnimatedStyle = {
            transform: [
                {
                    rotateY: flipAnimValues[item.id].interpolate({
                        inputRange: [0, 180],
                        outputRange: ['180deg', '360deg']
                    })
                }
            ]
        };

        const frontOpacity = flippedCards[item.id] ? 0 : 1;
        const backOpacity = flippedCards[item.id] ? 1 : 0;

        return (
            <TouchableOpacity onPress={() => flipCard(item.id)} style={styles.cardContainer}>
                <Animated.View style={[styles.card, frontAnimatedStyle, { opacity: frontOpacity }]}>
                    <Image source={item.image} style={styles.cardImage} />
                </Animated.View>
                <Animated.View style={[styles.card, backAnimatedStyle, styles.cardBack, { opacity: backOpacity }]}>
                    <Text style={styles.cardText}>{item.description}</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={cardData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3} // Set the number of columns for the grid
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34ace0',
        padding: 20, // Padding around the grid
    },
    cardContainer: {
        width: '33.333%', 
        aspectRatio: 1, 
        padding: 5, 
    },
    card: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff9f1a', 
        borderRadius: 10, 
        backfaceVisibility: 'hidden', // Hide the back face of the card when flipped
        // The following shadow properties are for iOS
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        // The following elevation is for Android
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10, 
    },
    cardBack: {
        position: 'absolute', 
        width: '100%',
        height: '100%',
        backgroundColor: '#ffb142', // Slightly different shade for the card back
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        color: '#ffffff', 
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
});

