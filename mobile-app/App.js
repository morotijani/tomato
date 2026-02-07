import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4CAF50',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Tomato Disease Detector',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Results"
                    component={ResultsScreen}
                    options={{
                        title: 'Detection Results',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
