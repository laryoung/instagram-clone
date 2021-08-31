import React from 'react';
import { View, Text, Button } from 'react-native';

const LandingScreen = (props) => {
    const { navigation } = props;
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

export default LandingScreen;
