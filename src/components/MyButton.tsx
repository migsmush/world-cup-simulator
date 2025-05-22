import { Button, View, StyleSheet} from "react-native";

const MyButton = () => {

    const onButtonPress = () => {
        console.log("hello world! button pressed");
    }

    return (
        <View style={styles.btn}>
            <Button onPress={onButtonPress} title="press me" color="#ff0000"/>
            <Button onPress={onButtonPress} title="press me too" color="#ff00ff"/>
        </View>
    )
};

export { MyButton };

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    }
})