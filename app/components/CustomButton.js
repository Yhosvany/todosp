import React from 'react';
import { Pressable, Text, StyleSheet } from "react-native";

export default function CustomButton(props) {
    return (
        <Pressable
            onPress={props.onPressFunction}
            style={({pressed}) => [
            {backgroundColor: (pressed) ? '#999' : props.color},
            styles.button]}
        >
        <Text style={styles.text}>{props.title}</Text> 
      </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        margin: 10,
        borderWidth: 2
    },
})

