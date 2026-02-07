import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

const ResultsScreen = ({ route, navigation }) => {
    const { prediction, image } = route.params;

    const getConfidenceColor = score => {
        if (score >= 0.9) return '#4CAF50';
        if (score >= 0.7) return '#FF9800';
        return '#F44336';
    };

    const getConfidenceLabel = score => {
        if (score >= 0.9) return 'High Confidence';
        if (score >= 0.7) return 'Medium Confidence';
        return 'Low Confidence';
    };

    const isHealthy = prediction.disease_name.toLowerCase() === 'healthy';

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image.uri }} style={styles.image} />
            </View>

            <View style={styles.resultCard}>
                <View style={styles.diseaseHeader}>
                    <Text style={styles.diseaseLabel}>Detection Result</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: isHealthy ? '#4CAF50' : '#FF5722' },
                        ]}>
                        <Text style={styles.statusText}>
                            {isHealthy ? '✓ Healthy' : '⚠ Disease Detected'}
                        </Text>
                    </View>
                </View>

                <Text style={styles.diseaseName}>{prediction.disease_name}</Text>

                <View style={styles.confidenceContainer}>
                    <View style={styles.confidenceHeader}>
                        <Text style={styles.confidenceLabel}>Confidence Score</Text>
                        <Text
                            style={[
                                styles.confidenceText,
                                { color: getConfidenceColor(prediction.confidence_score) },
                            ]}>
                            {(prediction.confidence_score * 100).toFixed(1)}%
                        </Text>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                {
                                    width: `${prediction.confidence_score * 100}%`,
                                    backgroundColor: getConfidenceColor(
                                        prediction.confidence_score,
                                    ),
                                },
                            ]}
                        />
                    </View>

                    <Text
                        style={[
                            styles.confidenceLabelText,
                            { color: getConfidenceColor(prediction.confidence_score) },
                        ]}>
                        {getConfidenceLabel(prediction.confidence_score)}
                    </Text>
                </View>
            </View>

            <View style={styles.treatmentCard}>
                <Text style={styles.treatmentTitle}>
                    {isHealthy ? '🌱 Care Recommendations' : '💊 Treatment Recommendations'}
                </Text>
                <Text style={styles.treatmentText}>
                    {prediction.treatment_recommendation}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}>
                <Text style={styles.backButtonText}>Analyze Another Plant</Text>
            </TouchableOpacity>

            <View style={styles.disclaimer}>
                <Text style={styles.disclaimerText}>
                    ⚠️ This is an AI-based prediction. For serious issues, please consult
                    an agricultural expert.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    imageContainer: {
        backgroundColor: '#FFF',
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 12,
    },
    resultCard: {
        backgroundColor: '#FFF',
        margin: 16,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    diseaseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    diseaseLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    diseaseName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    confidenceContainer: {
        marginTop: 12,
    },
    confidenceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    confidenceLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    confidenceText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
    confidenceLabelText: {
        fontSize: 14,
        fontWeight: '600',
    },
    treatmentCard: {
        backgroundColor: '#FFF',
        margin: 16,
        marginTop: 0,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    treatmentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    treatmentText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    backButton: {
        backgroundColor: '#4CAF50',
        margin: 16,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disclaimer: {
        margin: 16,
        marginTop: 0,
        padding: 16,
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    disclaimerText: {
        fontSize: 13,
        color: '#E65100',
        lineHeight: 20,
    },
});

export default ResultsScreen;
