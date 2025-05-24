import { fetchRankingOverview } from './api';
import { MyButton, MyTextInput } from './components'
import { View, Text, Dimensions, TouchableHighlight, Button } from 'react-native'

const App = () => {

  const { width, height } = Dimensions.get('window');

  const onPressButton = () => {
    console.log("button pressed, rank overview bellow: ")
    fetchRankingOverview();
  };

  return (
    <View
      style={{
        width,
        height,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Hello</Text>
        <Text>Try editing me! 🎉</Text>
      <TouchableHighlight underlayColor='#ff0000' onPress={() => {}} style={{ borderWidth: 0}}>
        <View style={{backgroundColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center', padding: 10}}>
          <Text>Press Me</Text>
        </View>
      </TouchableHighlight>
      <Button onPress={onPressButton} title='my button' color={'#dd0000'}/>
    </View>
  );
}

export default App
