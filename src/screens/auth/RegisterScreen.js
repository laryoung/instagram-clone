import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        };

        this.onSignUp = this.onSignUp.bind(this);
    }
    onSignUp() {
        const { email, password, name } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) =>
                firebase
                    .firestore()
                    .collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .set({ name, email })
            )
            .catch((error) => console.log(error));
    }
    render() {
        return (
            <View style={styles.marginStyle}>
                <Text>Sign Up</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter name"
                    onChangeText={(name) => this.setState({ name })}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                />
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
                <Button title="Register" onPress={() => this.onSignUp()} />
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
export default RegisterScreen;
