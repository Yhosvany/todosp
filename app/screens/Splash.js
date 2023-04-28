import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

export default function Splash({navigation}) {

    useEffect(() => {
        setTimeout(() => navigation.replace('MyTasks'), 2000);
    }, []);    

    return (
        <View style={styles.body}>
            <Text style={styles.text}>To-Do List App</Text>
            <Image
                style={styles.logo}
                source={require('../assets/icon.png')}
            />
            <Text style={styles.text}>Simple as Possible</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 180,
        height: 180,
        margin: 10
    },
    text: {
        fontSize: 30,
        color: '#25292e',
    },
})