import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const MyTextInput = () => {
    const [textInputValue, setTextInputValue] = useState('');

    return (
        <TextInput style={styles.input} onChangeText={setTextInputValue} value={textInputValue} secureTextEntry />
    );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export { MyTextInput };
