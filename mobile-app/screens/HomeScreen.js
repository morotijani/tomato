import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    Alert,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { predictDisease } from '../services/api';

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePicked = async imageUri => {
        if (!imageUri) {
            return;
        }

        const image = {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'tomato_image.jpg',
        };

        setSelectedImage(image);

        // Upload and predict
        setLoading(true);
        try {
            const result = await predictDisease(image);

            if (result.success) {
                // Navigate to results screen
                navigation.navigate('Results', {
                    prediction: result.data,
                    image: image,
                });
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred');
        } finally {
            setLoading(false);
            setSelectedImage(null);
        }
    };

    const handleCaptureImage = async () => {
        // Request camera permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission Required', 'Camera permission is required to take photos');
            return;
        }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            handleImagePicked(result.assets[0].uri);
        }
    };

    const handlePickFromGallery = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission Required', 'Gallery permission is required to select photos');
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            handleImagePicked(result.assets[0].uri);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>🍅</Text>
                <Text style={styles.title}>Tomato Disease Detector</Text>
                <Text style={styles.subtitle}>
                    Detect diseases in your tomato plants using AI
                </Text>
            </View>

            {selectedImage && (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: selectedImage.uri }} style={styles.preview} />
                    <ActivityIndicator
                        size="large"
                        color="#4CAF50"
                        style={styles.loader}
                    />
                    <Text style={styles.analyzingText}>Analyzing image...</Text>
                </View>
            )}

            {!loading && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cameraButton]}
                        onPress={handleCaptureImage}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonIcon}>📷</Text>
                        <Text style={styles.buttonText}>Capture Image</Text>
                        <Text style={styles.buttonSubtext}>Take a photo of your plant</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.galleryButton]}
                        onPress={handlePickFromGallery}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonIcon}>🖼️</Text>
                        <Text style={styles.buttonText}>Pick from Gallery</Text>
                        <Text style={styles.buttonSubtext}>Choose an existing photo</Text>
                    </TouchableOpacity>
                </View>
            )}

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={styles.loadingText}>Processing image...</Text>
                </View>
            )}

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    💡 Tip: Take clear photos in good lighting for best results
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    logo: {
        fontSize: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    previewContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    preview: {
        width: 200,
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
    },
    loader: {
        marginVertical: 10,
    },
    analyzingText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
    },
    buttonContainer: {
        gap: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cameraButton: {
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: '#2196F3',
    },
    buttonIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    buttonSubtext: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default HomeScreen;
