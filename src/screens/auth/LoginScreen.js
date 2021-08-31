import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn() {
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    }
    render() {
        return (
            <View style={styles.marginStyle}>
                <Text>Sign In</Text>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter email"
                    onChangeText={(email) => this.setState({ email })}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter password"
                    onChangeText={(password) => this.setState({ password })}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <Button title="Sign in" onPress={() => this.onSignIn()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    marginStyle: {
        marginVertical: 30,
    },
    inputStyle: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 20,
        marginHorizontal: 20,
    },
});
export default LoginScreen;
