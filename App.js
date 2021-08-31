import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';
import { firebaseConfig } from './src/firebase/config';

//Screens
import LandingScreen from './src/screens/auth/LandingScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import LoginScreen from './src/screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

//Initializa firebase project
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loggedIn: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({ loaded: true, loggedIn: false });
            } else {
                this.setState({ loaded: true, loggedIn: true });
            }
        });
    }

    render() {
        const { loaded, loggedIn } = this.state;
        if (!loaded) {
            return (
                <View>
                    <Text>Loading ...</Text>
                </View>
            );
        }

        if (!loggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen
                            name="Landing"
                            component={LandingScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            <View>
                <Text>Logged In as User</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
